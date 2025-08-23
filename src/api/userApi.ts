import { baseApi } from './baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, void>({
      query: () => ({ url: '/api/v1/users' }),
      providesTags: ['Users']
    }),
    blockUser: builder.mutation<any, string>({
      query: (id) => ({ url: `/api/v1/users/block/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users']
    }),
    unblockUser: builder.mutation<any, string>({
      query: (id) => ({ url: `/api/v1/users/unblock/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users']
    })
  })
})

export const { useGetAllUsersQuery, useBlockUserMutation, useUnblockUserMutation } = userApi
