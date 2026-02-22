export interface User {
  id: number;
  name?: string | null;
  roles?: ('admin' | 'customer')[] | null;
  orders?: {
    docs?: (number | Order)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  cart?: {
    docs?: (number | Cart)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  addresses?: {
    docs?: (number | Address)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
  | {
    id: string;
    createdAt?: string | null;
    expiresAt: string;
  }[]
  | null;
  password?: string | null;
  collection: 'users';
}
