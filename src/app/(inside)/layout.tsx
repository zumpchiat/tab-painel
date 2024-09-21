"use client";
import Header from "@/components/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, Typography, Box } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        <Header />
        <Container component="section" maxWidth="lg">
          {children}
        </Container>
      </body>
    </html>
  );
}
