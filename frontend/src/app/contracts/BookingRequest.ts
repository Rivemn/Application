export interface BookingRequest {
  fullName: string;
  email: string;
  workspaceId: string;
  start: string;
  end: string;
  availabilityId: string;
}
