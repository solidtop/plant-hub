"use client";

import UserDto from "@/types/UserDto";
import ApiError from "@/responses/ApiError";
import ValidationError from "@/responses/ValidationError";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import LoginRequest from "@/types/LoginRequest";
import RegisterRequest from "@/types/RegisterRequest";
import fetchData from "@/utils/fetchData";
import HttpMethod from "@/enums/HttpMethod";
import { useRouter } from "next/navigation";

type UserPayload = UserDto & ApiError;
type LoginPayload = UserDto & ValidationError<LoginRequest> & ApiError;
type RegisterPayload = UserDto & ValidationError<RegisterRequest> & ApiError;

type UserState = {
  user: UserDto | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<LoginPayload | null>;
  logout: () => Promise<void>;
  register: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<RegisterPayload | null>;
};

export const UserContext = createContext<UserState>({
  user: null,
  loading: true,
  login: async () => {
    return null;
  },
  logout: async () => {},
  register: async () => {
    return null;
  },
});

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const payload = await fetchData<UserPayload>(
        "api/auth/user",
        HttpMethod.GET
      );

      if (!payload?.error) {
        setUser(payload);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (username: string, password: string) => {
    const payload = await fetchData<LoginPayload>(
      "/api/auth/login",
      HttpMethod.POST,
      { username, password }
    );

    if (payload && (!payload.error || !payload.errors)) {
      setUser(payload);
    }

    setLoading(false);

    return payload;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(null);
  };

  const register = async (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    const payload = await fetchData<RegisterPayload>(
      "api/auth/register",
      HttpMethod.POST,
      {
        username,
        password,
        confirmPassword,
      }
    );

    if (payload && (!payload.error || !payload.errors)) {
      setUser(payload);
    }

    return payload;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
