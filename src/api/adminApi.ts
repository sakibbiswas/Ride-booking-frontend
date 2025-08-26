// src/api/adminApi.ts
import { baseApi } from './baseApi'

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    approveDriver: builder.mutation<any, string>({
      query: (id) => ({ url: `/users/approve/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users'],
    }),
    suspendDriver: builder.mutation<any, string>({
      query: (id) => ({ url: `/users/suspend/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users'],
    }),
    blockDriver: builder.mutation<any, string>({
      query: (id) => ({ url: `/users/block/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users'],
    }),
    systemStats: builder.query<{
      totalDrivers: number
      approvedDrivers: number
      onlineDrivers: number
    }, void>({
      query: () => '/admin/system-stats',
      providesTags: ['Stats'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useBlockDriverMutation,
  useSystemStatsQuery,
} = adminApi
