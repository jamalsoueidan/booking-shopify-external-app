import { useFetch } from "../hooks/useFetch";
import { useCallback, useEffect, useState } from "react";

type UseReceivePasswordPhoneFetch = ({
  phone,
}: ReceivePasswordBody) => Promise<ApiResponse<ReceivePasswordResponse>>;

export const useReceivePassword = () => {
  const { post } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const receivePassword: UseReceivePasswordPhoneFetch = useCallback(
    async ({ phone }) => {
      setIsFetching(true);
      const response = await post<ApiResponse<ReceivePasswordResponse>>(
        "password-phone",
        { phone }
      );
      setIsFetching(false);
      setIsFetched(true);
      return response;
    },
    [post]
  );

  return {
    receivePassword,
    isFetching,
    isFetched,
  };
};

type UseLoginFetch = ({
  identification,
  password,
}: LoginBody) => Promise<ApiResponse<LoginResponse>>;

export const useLogin = () => {
  const { post } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const login: UseLoginFetch = useCallback(
    async (body) => {
      setIsFetching(true);
      const response = await post<ApiResponse<LoginResponse>>("login", body);
      setIsFetching(false);
      setIsFetched(true);
      const token = response.payload.token;
      localStorage.setItem("token", token);
      return response;
    },
    [post]
  );

  return {
    login,
    isFetching,
    isFetched,
  };
};

export const checkLogin = () => {
  const { get } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await get<ApiResponse<LoginResponse>>("settings");
        setIsFetching(false);
        setIsLoggedIn(response.success);
      } catch (error) {
        setIsFetching(false);
        setIsLoggedIn(false);
      }
    };

    login();
  }, []);

  return {
    isLoggedIn,
    isFetching,
  };
};
