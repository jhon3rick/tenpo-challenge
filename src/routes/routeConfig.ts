export type AppRouteKey = "login" | "home";

export type AppRouteConfig = {
  auth: boolean;
  path: string;
};

export const routeConfig: Record<AppRouteKey, AppRouteConfig> = {
  login: { auth: false, path: "/login" },
  home: { auth: true, path: "/home" },
};
