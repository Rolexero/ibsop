export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export type Status =
  | "approved"
  | "pending"
  | "Delivered"
  | "request_pickup"
  | "pickup_requested"
  | "success"
  | "cancelled"
  | "Pending"
  | "In Transit";
