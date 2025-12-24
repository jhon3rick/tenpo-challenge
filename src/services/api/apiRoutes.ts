export type ApiRouteKey = "login" | "list_items";

export type ApiRouteConfig = {
  auth: boolean;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
};

export const apiRoutes: Record<ApiRouteKey, ApiRouteConfig> = {
  list_items: { auth: true, method: "GET", path: "/pokemon" },

  // endpoint "fake" (axios-mock-adapter)
  login: { auth: false, method: "POST", path: "/auth/login" },
};
