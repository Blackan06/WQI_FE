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
  const finalUrl = typeof url === "string" ? url : url(apiLinks);

  console.log(`[HTTP ${method.toUpperCase()}] ${finalUrl}`);
  if (data) {
    console.log('Request data:', data);
  }
  if (params) {
    console.log('Request params:', params);
  }

  const source = axios.CancelToken.source();
  if (signal) {
    signal.addEventListener("abort", () => {
      source.cancel();
    });
  }

  return axios.request<T, R>({
    method,
    headers: {
      "content-type": contentType,
      Authorization: `bearer ${token ?? tokenLocalStorage}`,
    },
    url: finalUrl,
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
    console.log(`[HTTP ${response.config.method?.toUpperCase()}] ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (err: AxiosError) => {
    console.error(`[HTTP ERROR] ${err.config?.method?.toUpperCase()} ${err.config?.url} - Status: ${err.response?.status}`);
    console.error('Error details:', {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      message: err.message,
    });

    if (err.response?.status === 401) {
      console.log('Unauthorized - redirecting to login');
      window.location.href = "/";
    }

    // return err.response;
    throw err;
  }
);

export default httpClient;
