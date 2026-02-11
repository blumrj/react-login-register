import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getFromLocalStorage } from '../utils'

//set up context api in the project. context api enables sharing data through the component tree without manually passing props at every level, avoiding prop drilling

//1. create the context
//2. use that context in the component that needs the data
//3. provide the context from the component that specifies the data

interface User {
  id?: string;
  email?: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

//1. creating context
const AuthContext = createContext<AuthContextType | undefined>(undefined);


//2. create a custom hook that will use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

//3. create a function that will provide the context
export const AuthProvider = ({ children }: AuthProviderProps) => {
  //get the user from localstorage
  const [user, setUser] = useState<User | null>(getFromLocalStorage('user'));

  // !! is an operator that makes sure the returned value is either true or false, no null, undefined, '' etc.
  const isAuthenticated = !!user;

  //a function that logs the user in by updating the user state
  const login = (userData: User) => {
    setUser(userData);
  };

  //a function that logs the user out by updating the user state
  const logout = () => {
    setUser(null);
  };

  //runs on the initial load, sets the user to the local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getFromLocalStorage('user'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  //returning the provider and the values that all child components can use
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};