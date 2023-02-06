import { ApiResponse, UserLoginBodyRequest, UserLoginResponse, UserReceivePasswordBodyRequest, UserReceivePasswordResponse } from "@jamalsoueidan/bsb.types";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

type UseReceivePasswordPhoneFetch = ({ phone }: UserReceivePasswordBodyRequest) => Promise<ApiResponse<UserReceivePasswordResponse>>;

export const useReceivePassword = () => {
  const { post } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const receivePassword: UseReceivePasswordPhoneFetch = useCallback(
    async ({ phone }) => {
      setIsFetching(true);
      const response = await post<ApiResponse<UserReceivePasswordResponse>>("password-phone", { phone });
      setIsFetching(false);
      setIsFetched(true);
      return response;
    },
    [post],
  );

  return {
    isFetched,
    isFetching,
    receivePassword,
  };
};

type UseLoginFetch = ({ identification, password }: UserLoginBodyRequest) => Promise<ApiResponse<UserLoginResponse>>;

export const useLogin = () => {
  const { post } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const login: UseLoginFetch = useCallback(
    async (body) => {
      setIsFetching(true);
      const response = await post<ApiResponse<UserLoginResponse>>("login", body);
      setIsFetching(false);
      setIsFetched(true);
      const token = response.payload.token;
      localStorage.setItem("token", token);
      return response;
    },
    [post],
  );

  return {
    isFetched,
    isFetching,
    login,
  };
};

export const useCheckLogin = () => {
  const { get } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await get<ApiResponse<UserLoginResponse>>("settings");
        setIsFetching(false);
        setIsLoggedIn(response.success);
      } catch (error) {
        setIsFetching(false);
        setIsLoggedIn(false);
      }
    };

    login();
  }, [get]);

  return {
    isFetching,
    isLoggedIn,
  };
};
