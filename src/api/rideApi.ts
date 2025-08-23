// import { baseApi } from './baseApi'
// import { RideStatus } from '../utils/types'

// export const rideApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllRidesPublic: builder.query<any[], void>({
//       query: () => ({ url: '/api/v1/rides' }),
//       providesTags: ['Rides']
//     }),
//     requestRide: builder.mutation<any, { pickupLocation: string; destination: string; pickupTime?: string }>{
//       query: (body) => ({ url: '/api/v1/rides', method: 'POST', body }),
//       invalidatesTags: ['Rides']
//     }),
//     cancelRide: builder.mutation<any, string>({
//       query: (id) => ({ url: `/api/v1/rides/cancel/${id}`, method: 'PATCH' }),
//       invalidatesTags: ['Rides']
//     }),
//     myRides: builder.query<any[], void>({
//       query: () => ({ url: '/api/v1/rides/me' }),
//       providesTags: ['Rides']
//     }),
//     driverUpdateRideStatus: builder.mutation<any, { id: string; status: RideStatus }>({
//       query: ({ id, status }) => ({ url: `/api/v1/rides/${id}/status`, method: 'PATCH', body: { status } }),
//       invalidatesTags: ['Rides']
//     })
//   })
// })

// export const {
//   useGetAllRidesPublicQuery,
//   useRequestRideMutation,
//   useCancelRideMutation,
//   useMyRidesQuery,
//   useDriverUpdateRideStatusMutation
// } = rideApi








// // src/api/rideApi.ts
// import { baseApi } from './baseApi'
// import type { RideStatus, Ride } from '../utils/types'

// export const rideApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Public: fetch all rides
//     getAllRidesPublic: builder.query<{ data: Ride[] }, void>({
//       query: () => ({
//         url: '/api/v1/rides',
//       }),
//       providesTags: ['Rides'],
//     }),

//     // Rider: request a ride
//     requestRide: builder.mutation<
//       any,
//       { pickupLocation: string; destination: string; pickupTime?: string }
//     >({
//       query: (body) => ({
//         url: '/api/v1/rides',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['Rides'],
//     }),

//     // Rider: cancel a ride
//     cancelRide: builder.mutation<any, string>({
//       query: (id) => ({
//         url: `/api/v1/rides/cancel/${id}`,
//         method: 'PATCH',
//       }),
//       invalidatesTags: ['Rides'],
//     }),

//     // Rider: get my rides
//     myRides: builder.query<{ data: Ride[] }, void>({
//       query: () => ({
//         url: '/api/v1/rides/me',
//       }),
//       providesTags: ['Rides'],
//     }),

//     // Driver: update ride status
//     driverUpdateRideStatus: builder.mutation<any, { id: string; status: RideStatus }>(
//       {
//         query: ({ id, status }) => ({
//           url: `/api/v1/rides/${id}/status`,
//           method: 'PATCH',
//           body: { status },
//         }),
//         invalidatesTags: ['Rides'],
//       }
//     ),
//   }),
//   overrideExisting: false,
// })

// export const {
//   useGetAllRidesPublicQuery,
//   useRequestRideMutation,
//   useCancelRideMutation,
//   useMyRidesQuery,
//   useDriverUpdateRideStatusMutation,
// } = rideApi





import { baseApi } from './baseApi'
import type { RideStatus, Ride } from '../utils/types'

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRidesPublic: builder.query<{ data: Ride[] }, void>({
      query: () => '/api/v1/rides',
      providesTags: ['Rides'],
    }),
    requestRide: builder.mutation<any, { pickupLocation: string; destination: string; pickupTime?: string }>(
      {
        query: (body) => ({ url: '/api/v1/rides', method: 'POST', body }),
        invalidatesTags: ['Rides'],
      }
    ),
    cancelRide: builder.mutation<any, string>({
      query: (id) => ({ url: `/api/v1/rides/cancel/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Rides'],
    }),
    myRides: builder.query<{ data: Ride[] }, void>({
      query: () => '/api/v1/rides/me',
      providesTags: ['Rides'],
    }),
    driverUpdateRideStatus: builder.mutation<any, { id: string; status: RideStatus }>({
      query: ({ id, status }) => ({ url: `/api/v1/rides/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Rides'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllRidesPublicQuery,
  useRequestRideMutation,
  useCancelRideMutation,
  useMyRidesQuery,
  useDriverUpdateRideStatusMutation,
} = rideApi
