import { useMemo, useState } from "react";
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { loginThunk } from "../features/auth/authThunks";
import { withPageTitle } from "../hoc/withPageTitle";
import { Centered } from "../ui/Centered";

const LoginPageBase = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => email.trim().length > 0 && password.trim().length > 0, [email, password]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await dispatch(loginThunk({ email, password })).unwrap();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Centered>
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Card>
          <CardContent>
            <Stack spacing={2} component="form" onSubmit={onSubmit}>
              <Typography variant="h5" data-testid="login-title">Login</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Fake login: cualquier correo y contraseña.
              </Typography>

              {error ? <Alert severity="error">{error}</Alert> : null}

              <TextField
                label="Correo"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                fullWidth
                data-testid="login-email"
              />
              <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                fullWidth
                data-testid="login-password"
              />

              <Button type="submit" variant="contained" disabled={!canSubmit || submitting} data-testid="login-button">
                {submitting ? "Ingresando..." : "Ingresar"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Centered>
  );
};

export const LoginPage = withPageTitle("Login | React SPA Challenge", LoginPageBase);
