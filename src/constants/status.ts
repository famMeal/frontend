export enum STATUS {
  CART = "cart",
  PREPARING = "preparing",
  READY = "ready",
  PICKED_UP = "picked_up",
  COMPLETED = "completed",
}

export const READ_STATUS_NAME = {
  cancelled: "Cancelled",
  cart: "Cart",
  completed: "Completed",
  payment_failed: "Payment Failed",
  picked_up: "Picked Up",
  preparing: "Preparing",
  ready: "Ready",
} as const;

export type Status = keyof typeof READ_STATUS_NAME;
