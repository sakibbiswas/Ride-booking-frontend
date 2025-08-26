//utils/types.ts

// User roles
export const UserRole = {
  ADMIN: "admin",
  RIDER: "rider",
  DRIVER: "driver",
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]

// Ride status
export const RideStatus = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  PICKED_UP: "PICKED_UP",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const
export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus]

// Payment
export type PaymentMethod = "cash" | "card" | "wallet"

// Ride timestamps
export type RideTimestamps = {
  requestedAt?: string
  acceptedAt?: string
  pickedUpAt?: string
  completedAt?: string
  cancelledAt?: string
}

// Ride type
export type Ride = {
  _id: string
  rider?: string
  driver?: string
  pickupLocation: string
  destination: string
  status: RideStatus
  fare?: number
  paymentMethod?: PaymentMethod
  createdAt?: string
  updatedAt?: string
  timestamps?: RideTimestamps
}
