import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useQueryClient } from "react-query";

let shop = "testeriphone.myshopify.com";
if (import.meta.env.PROD) {
  shop = "bysistersdk.myshopify.com";
}

export type Options = {
  url: string;
  params?: Record<string, number | Date | undefined>;
  body?: unknown;
};

export const useFetch = () => {
  const queryClient = useQueryClient();

  const getHeaders = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return {};
  }, []);

  const createURL = useCallback((options: Options) => {
    let params: Array<string> = [];
    if (options?.params) {
      Object.keys(options.params).forEach((param) => {
        const value = options.params && options.params[param];
        if (typeof value === "object") {
          params.push(`${param}=${value.toJSON()}`);
        } else {
          params.push(`${param}=${value}`);
        }
      });
    }
    params.push(`shop=${shop}`);
    return "/api/" + options.url + "?" + params.join("&");
  }, []);

  const put = useCallback(
    async (options: Options) => {
      const response = await axios.put(createURL(options), options.body, getHeaders());
      return response.data;
    },
    [createURL, getHeaders],
  );

  const destroy = useCallback(
    async (options: Options) => {
      const response = await axios.delete(createURL(options), getHeaders());
      return response.data;
    },
    [createURL, getHeaders],
  );

  const post = useCallback(
    async <T>(options: Options): Promise<T> => {
      try {
        const response = await axios.post<unknown, AxiosResponse<T>>(createURL(options), options.body, getHeaders());
        return response?.data;
      } catch (error) {
        return error.response.data;
      }
    },
    [createURL, getHeaders],
  );

  const get = useCallback(
    async <T = never>(options: Options): Promise<T> => {
      try {
        const response = await axios.get<never, AxiosResponse<T>>(createURL(options), getHeaders());
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },
    [createURL, getHeaders],
  );

  return {
    destroy,
    get,
    mutate: (key: unknown) => queryClient.invalidateQueries(key),
    post,
    put,
  };
};
