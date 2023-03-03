export interface User {
  id: number;
  username: string;
  fullName: string;
  phone: string;

  role?: string;
  authorities?: string[];

  }
