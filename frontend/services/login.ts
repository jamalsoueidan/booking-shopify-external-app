import {
  ApiResponse,
  StaffLoginBodyRequest,
  StaffLoginResponse,
  StaffReceivePasswordBodyRequest,
  StaffReceivePasswordResponse,
} from "@jamalsoueidan/pkg.bsb-types";
import { useFetch } from "@jamalsoueidan/pkg.bsf";
import { useCallback, useEffect, useState } from "react";

type UseReceivePasswordPhoneFetch = ({
  phone,
}: StaffReceivePasswordBodyRequest) => Promise<ApiResponse<StaffReceivePasswordResponse>>;

export const useReceivePassword = () => {
  const { post } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const receivePassword: UseReceivePasswordPhoneFetch = useCallback(
    async (body) => {
      setIsFetching(true);
      const response = await post<ApiResponse<StaffReceivePasswordResponse>>({
        body,
        url: "password-phone",
      });
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
  const { post, mutate } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const login: UseLoginFetch = useCallback(
    async (body) => {
      setIsFetching(true);
      const response = await post<ApiResponse<StaffLoginResponse>>({ body, url: "login" });
      setIsFetching(false);
      setIsFetched(true);
      mutate(["settings"]);
      const token = response.payload.token;
      localStorage.setItem("token", token);
      return response;
    },
    [mutate, post],
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await get<ApiResponse<StaffLoginResponse>>({ url: "settings" });
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
