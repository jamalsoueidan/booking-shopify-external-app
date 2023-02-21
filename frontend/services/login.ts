import {
  ApiResponse,
  StaffLoginBodyRequest,
  StaffLoginResponse,
  StaffReceivePasswordBodyRequest,
  StaffReceivePasswordResponse,
} from "@jamalsoueidan/pkg.bsb-types";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";

type UseReceivePasswordPhoneFetch = ({
  phone,
}: StaffReceivePasswordBodyRequest) => Promise<ApiResponse<StaffReceivePasswordResponse>>;

export const useReceivePassword = () => {
  const { post } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const receivePassword: UseReceivePasswordPhoneFetch = useCallback(
    async ({ phone }) => {
      setIsFetching(true);
      const response = await post<ApiResponse<StaffReceivePasswordResponse>>("password-phone", { phone });
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

type UseLoginFetch = ({ identification, password }: StaffLoginBodyRequest) => Promise<ApiResponse<StaffLoginResponse>>;

export const useLogin = () => {
  const { post } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const login: UseLoginFetch = useCallback(
    async (body) => {
      setIsFetching(true);
      const response = await post<ApiResponse<StaffLoginResponse>>("login", body);
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
        const response = await get<ApiResponse<StaffLoginResponse>>("settings");
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
