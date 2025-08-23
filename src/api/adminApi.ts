import { baseApi } from './baseApi'

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    approveDriver: builder.mutation<any, string>({
      query: (id) => ({ url: `/api/v1/admin/approve-driver/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users']
    }),
    suspendDriver: builder.mutation<any, string>({
      query: (id) => ({ url: `/api/v1/admin/suspend-driver/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users']
    }),
    systemStats: builder.query<{ totalDrivers: number; approvedDrivers: number; onlineDrivers: number }, void>({
      query: () => ({ url: '/api/v1/admin/system-stats' }),
      providesTags: ['Stats']
    })
  })
})

export const { useApproveDriverMutation, useSuspendDriverMutation, useSystemStatsQuery } = adminApi
