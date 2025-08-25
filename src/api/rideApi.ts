
// // src/api/rideApi.ts
// import { baseApi } from './baseApi'
// import type { Ride, RideStatus, PaymentMethod } from '../utils/types'

// export const rideApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllRidesPublic: builder.query<{ data: Ride[] }, void>({
//       query: () => '/rides',
//       providesTags: ['Rides'],
//     }),
//     estimateFare: builder.query<
//       { success: boolean; data: { estimatedFare: number; distanceKm: number; durationMin: number } },
//       { pickup: string; destination: string }
//     >({
//       query: ({ pickup, destination }) =>
//         `/rides/estimate?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`,
//     }),
//     createRide: builder.mutation<
//       { success: boolean; data: Ride },
//       { pickupLocation: string; destination: string; paymentMethod: PaymentMethod; offerFare?: number; pickupTime?: string }
//     >({
//       query: (body) => ({ url: '/rides', method: 'POST', body }),
//       invalidatesTags: ['Rides'],
//     }),
//     cancelRide: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({ url: `/rides/cancel/${id}`, method: 'PATCH' }),
//       invalidatesTags: ['Rides'],
//     }),
//     myRides: builder.query<{ data: Ride[] }, void>({
//       query: () => '/rides/me',
//       providesTags: ['Rides'],
//     }),
//     driverUpdateRideStatus: builder.mutation<
//       { success: boolean; data: Ride },
//       { id: string; status: RideStatus }
//     >({
//       query: ({ id, status }) => ({ url: `/rides/${id}/status`, method: 'PATCH', body: { status } }),
//       invalidatesTags: ['Rides'],
//     }),
//     createPaymentIntent: builder.mutation<
//       { success: boolean; clientSecret?: string; paymentId?: string },
//       { rideId: string; method: PaymentMethod }
//     >({
//       query: (body) => ({ url: '/payments/intents', method: 'POST', body }),
//     }),
//   }),
//   overrideExisting: false,
// })

// export const {
//   useGetAllRidesPublicQuery,
//   useEstimateFareQuery,
//   useCreateRideMutation,
//   useCancelRideMutation,
//   useMyRidesQuery,
//   useDriverUpdateRideStatusMutation,
//   useCreatePaymentIntentMutation,
// } = rideApi

// //  Export PaymentMethod so other files can import
// export type { PaymentMethod }















// import { baseApi } from './baseApi'
// import type { Ride, RideStatus, PaymentMethod } from '../utils/types'

// export const rideApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllRidesPublic: builder.query<{ data: Ride[] }, void>({
//       query: () => '/rides',
//       providesTags: ['Rides'],
//     }),
//     getRideById: builder.query<{ data: Ride }, string>({
//       query: (id) => `/rides/${id}`,
//       providesTags: ['Rides'],
//     }),
//     estimateFare: builder.query<
//       { success: boolean; data: { estimatedFare: number; distanceKm: number; durationMin: number } },
//       { pickup: string; destination: string }
//     >({
//       query: ({ pickup, destination }) =>
//         `/rides/estimate?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`,
//     }),
//     createRide: builder.mutation<
//       { success: boolean; data: Ride },
//       { pickupLocation: string; destination: string; paymentMethod: PaymentMethod; offerFare?: number; pickupTime?: string }
//     >({ query: (body) => ({ url: '/rides', method: 'POST', body }), invalidatesTags: ['Rides'] }),
//     cancelRide: builder.mutation<{ success: boolean }, string>({ query: (id) => ({ url: `/rides/cancel/${id}`, method: 'PATCH' }), invalidatesTags: ['Rides'] }),
//     myRides: builder.query<{ data: Ride[] }, void>({ query: () => '/rides/me', providesTags: ['Rides'] }),
//     driverUpdateRideStatus: builder.mutation<{ success: boolean; data: Ride }, { id: string; status: RideStatus }>({ query: ({ id, status }) => ({ url: `/rides/${id}/status`, method: 'PATCH', body: { status } }), invalidatesTags: ['Rides'] }),
//     createPaymentIntent: builder.mutation<{ success: boolean; clientSecret?: string; paymentId?: string }, { rideId: string; method: PaymentMethod }>({ query: (body) => ({ url: '/payments/intents', method: 'POST', body }) }),
//   }),
//   overrideExisting: false,
// })

// export const {
//   useGetAllRidesPublicQuery,
//   useGetRideByIdQuery,
//   useEstimateFareQuery,
//   useCreateRideMutation,
//   useCancelRideMutation,
//   useMyRidesQuery,
//   useDriverUpdateRideStatusMutation,
//   useCreatePaymentIntentMutation,
// } = rideApi

// export type { PaymentMethod }









// src/api/rideApi.ts
import { baseApi } from './baseApi'
import type { Ride, RideStatus } from '../utils/types'

export type PaymentMethod = 'cash' | 'card' | 'wallet'

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRidesPublic: builder.query<{ data: Ride[] }, void>({
      query: () => '/rides',
      providesTags: ['Rides'],
    }),
    getRideById: builder.query<{ data: Ride }, string>({
      query: (id) => `/rides/${id}`,
      providesTags: ['Rides'],
    }),
    estimateFare: builder.query<
      { success: boolean; data: { estimatedFare: number; distanceKm: number; durationMin: number } },
      { pickup: string; destination: string }
    >({
      query: ({ pickup, destination }) =>
        `/rides/estimate?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`,
    }),
    createRide: builder.mutation<
      { success: boolean; data: Ride },
      { pickupLocation: string; destination: string; paymentMethod: PaymentMethod; offerFare?: number; pickupTime?: string }
    >({
      query: (body) => ({ url: '/rides', method: 'POST', body }),
      invalidatesTags: ['Rides'],
    }),
    cancelRide: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/rides/cancel/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Rides'],
    }),
    myRides: builder.query<{ data: Ride[] }, void>({
      query: () => '/rides/me',
      providesTags: ['Rides'],
    }),
    driverUpdateRideStatus: builder.mutation<
      { success: boolean; data: Ride },
      { id: string; status: RideStatus }
    >({
      query: ({ id, status }) => ({ url: `/rides/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Rides'],
    }),
    createPaymentIntent: builder.mutation<
      { success: boolean; clientSecret?: string; paymentId?: string },
      { rideId: string; method: PaymentMethod }
    >({
      query: (body) => ({ url: '/payments/intents', method: 'POST', body }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllRidesPublicQuery,
  useGetRideByIdQuery,
  useEstimateFareQuery,
  useCreateRideMutation,
  useCancelRideMutation,
  useMyRidesQuery,
  useDriverUpdateRideStatusMutation,
  useCreatePaymentIntentMutation,
} = rideApi
