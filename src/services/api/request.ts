import { axiosInstance } from "./axiosInstance";
import { apiRoutes, ApiRouteKey } from "./apiRoutes";

type RequestPayload = Record<string, unknown>;

// función única para consumir endpoints por índice de configuración
export const request = async <TResponse>(
  configKey: ApiRouteKey,
  payload?: RequestPayload
): Promise<TResponse> => {
  const route = apiRoutes[configKey];

  if (!route) {
    throw new Error(`Unknown api route key: ${String(configKey)}`);
  }

  const response = await axiosInstance.request<TResponse>({
    url: route.path,
    method: route.method,
    data: payload,
  });

  return response.data;
};
