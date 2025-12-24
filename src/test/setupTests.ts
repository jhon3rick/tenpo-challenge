import { beforeAll, afterAll, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { server } from "./testServer";

// MSW: levantar server antes de todos los tests
beforeAll(() => server.listen());

// Reset handlers después de cada test
afterEach(() => server.resetHandlers());

// Cerrar server al final
afterAll(() => server.close());
