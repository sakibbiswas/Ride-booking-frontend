
// src/api/authApi.ts
import { baseApi } from './baseApi'
import { UserRole } from '../utils/types'

type LoginBody = { email: string; password: string }
type RegisterBody = { name: string; email: string; password: string; role: UserRole }

interface LoginResponse {
  token: string
  user: any
}

interface RegisterResponse {
  token: string
  user: any
}

interface MeResponse {
  success: boolean
  data: any
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (body) => ({
        url: '/auth/login', //  baseUrl already has /api/v1
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response.data,
    }),

    register: builder.mutation<RegisterResponse, RegisterBody>({
      query: (body) => ({
        url: '/auth/register', //  baseUrl already has /api/v1
        method: 'POST',
        body,
      }),
      transformResponse: (response: any) => response.data,
    }),

    me: builder.query<MeResponse, void>({
      query: () => '/users/me', //  baseUrl already has /api/v1
      transformResponse: (response: any) => response.data,
      providesTags: ['Me'],
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi
