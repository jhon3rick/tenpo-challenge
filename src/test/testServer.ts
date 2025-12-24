import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const POKE_BASE = import.meta.env.VITE_API_BASE_URL;

export const server = setupServer(
  // Fake login
  http.post(`${POKE_BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string };

    if (!body?.email || !body?.password) {
      return HttpResponse.json({ message: "Email y password son requeridos" }, { status: 400 });
    }

    return HttpResponse.json(
      { token: "token-fake-123", user: { email: body.email } },
      { status: 200 }
    );
  }),

  // Listado 2000 (para test no necesitas 2000 reales; con 3-10 alcanza)
  http.get(`${POKE_BASE}/pokemon`, ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit") ?? "0";

    return HttpResponse.json(
      {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
          { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
        ],
        limit,
      },
      { status: 200 }
    );
  })
);
