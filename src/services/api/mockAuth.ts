import AxiosMockAdapter from "axios-mock-adapter";
import { axiosInstance } from "./axiosInstance";

export const setupAuthMock = () => {
  const mock = new AxiosMockAdapter(axiosInstance, { delayResponse: 500 });

  mock.onPost("/auth/login").reply((config) => {
    const body = config.data ? JSON.parse(config.data) : {};
    const email = String(body?.email ?? "");
    const password = String(body?.password ?? "");

    if (!email || !password) {
      return [400, { message: "Email y password son requeridos" }];
    }

    return [
      200,
      {
        token: "token-fake-123",
        user: { email },
      },
    ];
  });

  // Dejar pasar TODO lo demás a la API real (PokeAPI)
  mock.onAny().passThrough();

  return mock;
};
