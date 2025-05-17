export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash?: string; // ha nincs backend, nem kötelező
  createdAt: Date;
}
