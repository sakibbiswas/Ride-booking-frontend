
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../app/store'

//  Use environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', //  must match backend
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Me', 'Users', 'Rides', 'Driver', 'Stats', 'Notifications'],
  endpoints: () => ({}),
})
