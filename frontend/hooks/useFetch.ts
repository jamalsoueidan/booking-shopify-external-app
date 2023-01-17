import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import { useQueryClient } from "react-query";

let shop = "testeriphone.myshopify.com";

export const useFetch = () => {
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  const createURL = useCallback((url: string) => {
    let uri = url;
    let params = new URLSearchParams();
    if (url.indexOf("?") > -1) {
      uri = url.substring(0, url.indexOf("?"));
      params = new URLSearchParams(url.substring(url.indexOf("?") + 1));
    }
    params.append("shop", shop);
    return uri + "?" + params.toString();
  }, []);

  const put = useCallback(
    async (url: string, body?: any) => {
      const response = await axios.put(createURL(`/api/${url}`), body);
      return response.data;
    },
    [axios, createURL]
  );

  const destroy = useCallback(
    async (url: string) => {
      const response = await axios.delete(createURL(`/api/${url}`));
      return response.data;
    },
    [axios, createURL]
  );

  const post = useCallback(
    async <T>(url: string, body?: any): Promise<T> => {
      try {
        const response = await axios.post<any, AxiosResponse<T>>(
          createURL(`/api/${url}`),
          body
        );
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    [axios, createURL]
  );

  const get = useCallback(
    async <T = any>(url: string): Promise<T> => {
      try {
        const response = await axios.get<any, AxiosResponse<T>>(
          createURL(`/api/${url}`)
        );
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    [axios, createURL]
  );

  return {
    fetch,
    put,
    post,
    destroy,
    get,
    mutate: (key: any) => queryClient.invalidateQueries(key),
  };
};
