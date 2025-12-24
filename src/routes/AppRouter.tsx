import { useAppSelector } from "../store/hooks";
import { PublicFlow } from "./PublicFlow";
import { PrivateFlow } from "./PrivateFlow";

export const AppRouter = () => {
  const token = useAppSelector((s) => s.auth.token);

  // flujos según autenticación (público/privado)
  return token ? <PrivateFlow /> : <PublicFlow />;
};
