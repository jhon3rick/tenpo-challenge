import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../renderWithProviders";
import { App } from "../../App";

describe("Login flow", () => {
  it("permite hacer fake login y entrar a Home", async () => {
    renderWithProviders(<App />);

    // En flujo público debe estar Login
    expect(screen.getByTestId("login-title")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/Correo/i), "test@mail.com");
    await userEvent.type(screen.getByLabelText(/Contraseña/i), "1234");
    await userEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

    // Al loguear, AppRouter cambia al flujo privado
    expect(await screen.findByText(/Home/i)).toBeInTheDocument();
    expect(await screen.findByText(/Lista/i)).toBeInTheDocument();
  });

  describe("Login flow", () => {
    it("muestra disabled si falta email o password", async () => {
      renderWithProviders(<App />);

      const btn = screen.getByRole("button", { name: /Ingresar/i });
      expect(btn).toBeDisabled();

      // escribe solo email
      await userEvent.type(screen.getByLabelText(/Correo/i), "test@mail.com");
      expect(btn).toBeDisabled();

      // escribe password
      await userEvent.type(screen.getByLabelText(/Contraseña/i), "1234");
      expect(btn).toBeEnabled();
    });
  });
});
