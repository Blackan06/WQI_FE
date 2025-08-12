import axios, { Method, AxiosResponse, AxiosError } from "axios";
import apiLinks from "./api-link";

interface Options {
  url: ((al: typeof apiLinks) => string) | string;
  data?: object | string;
  params?: object;
  signal?: AbortSignal;
  contentType?: string;
  token?: string;
}

interface FullOptions extends Options {
  method: Method;
}

const request = <T = any, R = AxiosResponse<T>>(
  arg: FullOptions
): Promise<R> => {
  const {
    method,
    contentType = "application/json",
    url,
    data,
    params,
    signal,
    token,
  } = arg;

  const tokenLocalStorage = localStorage.getItem("token");

  const source = axios.CancelToken.source();
  if (signal) {
    signal.addEventListener("abort", () => {
      source.cancel();
    });
  }

  const authToken = token ?? tokenLocalStorage;
  console.log('Making request to:', typeof url === "string" ? url : url(apiLinks));
  console.log('Method:', method);
  console.log('Data:', data);
  console.log('Auth token:', authToken ? 'Present' : 'Missing');
  
  return axios.request<T, R>({
    method,
    headers: {
      "content-type": contentType,
      Authorization: authToken ? `bearer ${authToken}` : undefined,
    },
    url: typeof url === "string" ? url : url(apiLinks),
    data,
    params,
    cancelToken: source.token,
  });
};

const httpClient = {
  request,
  get: <T = any, R = AxiosResponse<T>>(arg: Options): Promise<R> => {
    return request({ ...arg, method: "GET" });
  },
  post: <T = any, R = AxiosResponse<T>>(arg: Options): Promise<R> => {
    return request({ ...arg, method: "POST" });
  },
  put: <T = any, R = AxiosResponse<T>>(arg: Options): Promise<R> => {
    return request({ ...arg, method: "PUT" });
  },
  delete: <T = any, R = AxiosResponse<T>>(arg: Options): Promise<R> => {
    return request({ ...arg, method: "DELETE" });
  },

  options: <T = any, R = AxiosResponse<T>>(arg: Options): Promise<R> => {
    return request({ ...arg, method: "OPTIONS" });
  },
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      window.location.href = "/";
    }

    // return err.response;
    throw err;
  }
);

export default httpClient;
