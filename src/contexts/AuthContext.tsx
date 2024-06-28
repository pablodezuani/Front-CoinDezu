import React, { useState, createContext, ReactNode, useEffect } from "react";
import { api } from '../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.token;
  const STORAGE_KEY = '@coinDezuToken';

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem(STORAGE_KEY);
      const hasUser: UserProps = userInfo ? JSON.parse(userInfo) : {};

      if (hasUser.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token
        });
      } else {
        // Caso não tenha token válido, não seta nenhum usuário
        setUser({
          id: '',
          name: '',
          email: '',
          token: ''
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/session', {
        email,
        password
      });

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        email,
        token
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(data);
    } catch (err) {
      console.log('Error during sign-in', err);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      });

      const { id, token } = response.data;

      const data = {
        id,
        name,
        email,
        token
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(data);
    } catch (err) {
      console.log('Error during registration', err);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser({
      id: '',
      name: '',
      email: '',
      token: ''
    });
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signIn,
      signUp,
      loading,
      loadingAuth,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}
