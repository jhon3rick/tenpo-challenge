import { Box } from "@mui/material";

export const Centered = ({
  children,
  minHeight = "100vh",
}: {
  children: React.ReactNode;
  minHeight?: string;
}) => {
  return (
    <Box
      sx={{
        minHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      {children}
    </Box>
  );
};
