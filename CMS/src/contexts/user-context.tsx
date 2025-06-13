'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import authService from '@/service/apis/auth/authService';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import _ from 'lodash';

import { Login } from '@/types/auth/auth.d';
import { User } from '@/types/user.d';

interface IAuthState {
  user?: User | null;
  isLoginedIn: boolean;
  isInitialized: boolean;
}

interface IAuthContext extends IAuthState {
  login: (credential: string, secret: string) => Promise<any>;
  logout: () => void;
  loadingPrepareData: boolean;
}

const initialState: IAuthState = {
  user: null,
  isLoginedIn: false,
  isInitialized: false,
};

const verifyToken = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: { exp?: number } = jwtDecode(token);
    return !!decoded.exp && decoded.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

const setSession = (token?: string | null) => {
  console.log('token', token);

  if (token) {
    localStorage.setItem('token', token);
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    // delete axios.defaults.headers.common.Authorization;
  }
};

export const UserContext = React.createContext<IAuthContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, setState] = useState<IAuthState>(initialState);

  const logout = () => {
    setSession(null);
    setState({ ...initialState, isInitialized: true });
  };

  const mLogin = useMutation({
    mutationKey: ['Login'],
    mutationFn: ({ username, password }: Login) => authService.login(username, password),
    onSuccess: async (res) => {
      const token = res.data.access_token;
      setSession(token);

      try {
        const me = await authService.getProfile();
        setState({
          isLoginedIn: true,
          isInitialized: true,
          user: _.get(me, 'data', {}),
        });
      } catch (error) {
        logout();
      }
    },
    onError: logout,
  });

  const mPrepareProfile = useMutation({
    mutationKey: ['GetProfile'],
    mutationFn: authService.getProfile,
    onSuccess: (res) => {
      setState({
        isLoginedIn: true,
        isInitialized: true,
        user: _.get(res, 'data', {}),
      });
    },
    onError: (error) => {
      console.log('error', error);
      logout();
    },
    retry: false,
  });

  const init = async () => {
    const token = localStorage.getItem('token');
    if (token && verifyToken(token)) {
      setSession(token);
      try {
        const res = await mPrepareProfile.mutateAsync();
        setState({
          isLoginedIn: true,
          isInitialized: true,
          user: _.get(res, 'data', {}),
          //   _.get(obj, 'path.to.value', defaultValue)
        });
      } catch (err) {
        logout();
      }
    } else {
      logout();
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        logout,
        login: (username: string, password: string) => mLogin.mutateAsync({ username, password }),
        loadingPrepareData: mPrepareProfile.isPending,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
