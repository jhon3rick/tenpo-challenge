import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export const AppHeader = ({
  title,
  subtitle,
  onLogout,
}: {
  title: string;
  subtitle?: string;
  onLogout: () => void;
}) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{title}</Typography>
          {subtitle ? (
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {subtitle}
            </Typography>
          ) : null}
        </Box>

        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
