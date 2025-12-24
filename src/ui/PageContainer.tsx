import { Container } from "@mui/material";

export const PageContainer = ({
  children,
  maxWidth = "lg",
}: {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  return (
    <Container maxWidth={maxWidth} sx={{ py: 3 }}>
      {children}
    </Container>
  );
};
