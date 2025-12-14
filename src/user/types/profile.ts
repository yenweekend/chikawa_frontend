export type Address = {
  id: number;
  city: string;
  locationDetail: string;
  phoneNumber: string;
  recipientName: string;
  isDefaultAddress: boolean;
  country: string;
  province: string;
};

export type Profile = {
  addresses: Address[];
  createdAt: string;
  email: string;
  fullName: string;
  id: number;
  lastSignInAt: string;
  lineUserId?: string;
  lockedAt?: string | null;
  role: "customer" | "admin";
} | null;
