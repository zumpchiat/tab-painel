"use client";
import { Box, Alert, Link as MuiLink } from "@mui/material";
import Link from "next/link";

const Page = () => {
  return (
    <Box component="form" sx={{ mt: 3, textAlign: "center" }}>
      <Alert variant="filled" severity="error" sx={{ mt: 3, mb: 3 }}>
        Link expirado, solicite a alteração novamente!
      </Alert>
      <MuiLink href="/login/forgot" component={Link} variant="button">
        Iniciar uma nova solicitação?
      </MuiLink>
    </Box>
  );
};

export default Page;
