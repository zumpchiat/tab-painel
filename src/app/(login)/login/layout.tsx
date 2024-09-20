"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, Typography, Box } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              mt: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h2" variant="h2">
              Empresa
            </Typography>
            <Typography component="h5" variant="h5">
              Painel da loja
            </Typography>

            {children}
          </Box>
        </Container>
      </body>
    </html>
  );
}
