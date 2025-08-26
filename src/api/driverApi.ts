import { baseApi } from './baseApi';

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleOnline: builder.mutation<any, boolean>({
      query: (isOnline) => ({
        url: '/driver/toggle-online', 
        method: 'PATCH',
        body: { isOnline },
      }),
      invalidatesTags: ['Me', 'Rides'],
    }),

    acceptRide: builder.mutation<any, string>({
      query: (rideId) => ({ url: `/driver/accept/${rideId}`, method: 'POST' }),
      invalidatesTags: ['Rides'],
    }),

    earnings: builder.query<{ totalEarnings: number; rideCount: number }, void>({
      query: () => ({ url: '/driver/earnings' }),
    }),

    listRequestedRides: builder.query<any[], void>({
      query: () => ({ url: '/rides' }),
      transformResponse: (resp: { data: any[] }) =>
        (resp?.data || []).filter((r) => r.status === 'REQUESTED' && !r.driverId),
      providesTags: ['Rides'],
    }),

    activeRide: builder.query<any | null, void>({
      query: () => ({ url: '/driver/active' }),
      transformResponse: (resp: { data: any | null }) => resp?.data ?? null,
      providesTags: ['Rides'],
    }),
  }),
});

export const {
  useToggleOnlineMutation,
  useAcceptRideMutation,
  useEarningsQuery,
  useListRequestedRidesQuery,
  useActiveRideQuery,
} = driverApi;

