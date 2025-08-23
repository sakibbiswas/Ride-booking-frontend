// import { baseApi } from './baseApi'
// // import { RideStatus } from '../utils/types'

// export const driverApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     acceptRide: builder.mutation<any, string>({
//       query: (rideId) => ({ url: `/api/v1/driver/accept/${rideId}`, method: 'POST' }),
//       invalidatesTags: ['Rides']
//     }),
//     earnings: builder.query<{ totalEarnings: number; rideCount: number }, void>({
//       query: () => ({ url: '/api/v1/driver/earnings' })
//     }),
//     // poll REQUESTED rides to simulate “incoming requests”
//     listRequestedRides: builder.query<any[], void>({
//       query: () => ({ url: '/api/v1/rides' }),
//       transformResponse: (rides: any[]) => rides.filter(r => r.status === 'REQUESTED'),
//       providesTags: ['Rides']
//     }),
//   })
// })

// export const { useAcceptRideMutation, useEarningsQuery, useListRequestedRidesQuery } = driverApi









import { baseApi } from './baseApi'

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    acceptRide: builder.mutation<any, string>({
      query: (rideId) => ({ url: `/api/v1/driver/accept/${rideId}`, method: 'POST' }),
      invalidatesTags: ['Rides']
    }),

    // NEW: toggle driver online/offline
    toggleOnline: builder.mutation<any, boolean>({
      query: (isOnline) => ({ url: '/api/v1/driver/toggle-online', method: 'PATCH', body: { isOnline } }),
      invalidatesTags: ['Rides', 'Me'],
    }),

    earnings: builder.query<{ totalEarnings: number; rideCount: number }, void>({
      query: () => ({ url: '/api/v1/driver/earnings' })
    }),

    // IMPORTANT: backend returns { success, message, data }
    listRequestedRides: builder.query<any[], void>({
      query: () => ({ url: '/api/v1/rides' }),
      transformResponse: (resp: { data: any[] }) =>
        (resp?.data || []).filter(r => r.status === 'REQUESTED' && !r.driverId),
      providesTags: ['Rides']
    }),

    // NEW: driver’s active ride
    activeRide: builder.query<any | null, void>({
      query: () => ({ url: '/api/v1/driver/active' }),
      transformResponse: (resp: { data: any | null }) => resp?.data ?? null,
      providesTags: ['Rides'],
    }),
  }),
})

export const {
  useAcceptRideMutation,
  useToggleOnlineMutation,
  useEarningsQuery,
  useListRequestedRidesQuery,
  useActiveRideQuery,
} = driverApi
