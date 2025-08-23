// import { baseApi } from './baseApi'
// import { UserRole } from '../utils/types'

// type LoginResponse = { token: string; user: any }
// type LoginBody = { email: string; password: string }
// type RegisterBody = { name: string; email: string; password: string; role: UserRole }

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, LoginBody>({
//       query: (body) => ({ url: '/api/v1/auth/login', method: 'POST', body })
//     }),
//     register: builder.mutation<any, RegisterBody>({
//       query: (body) => ({ url: '/api/v1/auth/register', method: 'POST', body })
//     }),
//     me: builder.query<any, void>({
//       query: () => ({ url: '/api/v1/users/me' }),
//       providesTags: ['Me']
//     })
//   })
// })

// export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi







import { baseApi } from './baseApi'
import { UserRole } from '../utils/types'

type LoginBody = { email: string; password: string }
type RegisterBody = { name: string; email: string; password: string; role: UserRole }

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: any }, LoginBody>({
      query: (body) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body,
      }),
      // ✅ transform response so frontend gets {token, user} directly
      transformResponse: (response: any) => response.data,
    }),

    register: builder.mutation<any, RegisterBody>({
      query: (body) => ({ url: '/api/v1/auth/register', method: 'POST', body }),
      transformResponse: (response: any) => response.data,
    }),

    me: builder.query<any, void>({
      query: () => ({ url: '/api/v1/users/me' }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Me'],
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi
