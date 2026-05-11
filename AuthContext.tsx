import { createContext } from 'react';

interface User {
  id: number;
  username: string;
  roles: string[];
}

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});
