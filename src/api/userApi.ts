
import { baseApi } from "./baseApi"

export interface User {
  _id: string
  name: string
  email: string
  role: 'rider' | 'driver' | 'admin'
  phone?: string
  isApproved?: boolean
  isBlocked?: boolean
  isOnline?: boolean
  vehicle?: { make?: string; model?: string; plate?: string }
  emergencyContacts?: { name: string; phone: string }[]
}

export interface Notification {
  _id: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Users
    getAllUsers: builder.query<{ success: boolean; data: User[] }, void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    blockUser: builder.mutation<{ success: boolean; data: User }, string>({
      query: (id) => ({ url: `/users/block/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users'],
    }),
    unblockUser: builder.mutation<{ success: boolean; data: User }, string>({
      query: (id) => ({ url: `/users/unblock/${id}`, method: 'PATCH' }),
      invalidatesTags: ['Users'],
    }),

    // Profile
    getMe: builder.query<{ success: boolean; data: User }, void>({
      query: () => '/users/me',
      providesTags: ['Me'],
    }),
    updateMe: builder.mutation<{ success: boolean; data: User }, Partial<User>>({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      invalidatesTags: ['Me'],
    }),

    // Emergency contacts
    updateEmergencyContacts: builder.mutation<
      { success: boolean; data: User },
      { emergencyContacts: { name: string; phone: string }[] }
    >({
      query: (body) => ({
        url: '/users/emergency-contacts',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Me'],
    }),

    // Change Password
    changePassword: builder.mutation<
      { success: boolean; message: string },
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: '/users/password',
        method: 'PATCH',
        body,
      }),
    }),

    // Notifications
    getNotifications: builder.query<{ success: boolean; data: Notification[] }, { unreadOnly?: boolean }>({
      query: ({ unreadOnly = false }) => `/notifications?unreadOnly=${unreadOnly}`,
      providesTags: ['Notifications'],
    }),
    markNotificationRead: builder.mutation<{ success: boolean; data: Notification }, string>({
      query: (id) => ({ url: `/notifications/${id}/read`, method: 'PATCH' }),
      invalidatesTags: ['Notifications'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useUpdateEmergencyContactsMutation,
  useChangePasswordMutation,

  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} = userApi
