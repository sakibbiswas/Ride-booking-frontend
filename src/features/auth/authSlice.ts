
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserRole } from '../../utils/types'

type AuthUser = {
  _id: string
  name: string
  email: string
  role: UserRole
  isBlocked?: boolean
  isApproved?: boolean
  isOnline?: boolean
}

type AuthState = {
  token: string | null
  user: AuthUser | null
}

//  safe JSON parser
const loadUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    console.error('Failed to parse user from localStorage', err)
    return null
  }
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: loadUser(),
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: AuthUser }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (!state.user) return
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
})

export const { setCredentials, logout, updateUser } = slice.actions
export default slice.reducer
