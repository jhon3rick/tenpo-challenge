import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppRouter } from "./routes/AppRouter";

const theme = createTheme({
  palette: { mode: "light" },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};
