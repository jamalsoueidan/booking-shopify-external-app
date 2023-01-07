import { useFetch } from "../hooks/useFetch";
import { useCallback, useState } from "react";

type UseReceivePasswordPhoneFetch = ({
  phone,
}: ReceivePasswordBody) => Promise<ApiResponse<ReceivePasswordReturn>>;

export const useReceivePassword = () => {
  const { post, mutate } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const receivePassword: UseReceivePasswordPhoneFetch = useCallback(
    async ({ phone }) => {
      setIsFetching(true);
      const response = await post<ApiResponse<ReceivePasswordReturn>>(
        "password-phone",
        { phone }
      );
      setIsFetching(false);
      setIsFetched(true);
      return response;
    },
    [mutate, post]
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
}: LoginBody) => Promise<ApiResponse<string>>;

export const useLogin = () => {
  const { post, mutate } = useFetch();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const login: UseLoginFetch = useCallback(
    async (body) => {
      setIsFetching(true);
      const response = await post<ApiResponse<string>>("login", body);
      setIsFetching(false);
      setIsFetched(true);
      return response;
    },
    [mutate, post]
  );

  return {
    login,
    isFetching,
    isFetched,
  };
};
