"use client";

import api from "@/libs/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Alert,
} from "@mui/material";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailField, setEmailfField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailField || !passwordField) {
      setError("Preencha os dados solicitados!");
      return;
    }
    setError("");
    setLoading(true);
    //fazer consulta na api
    const result = await api(emailField, passwordField);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <>
      <Typography
        component="p"
        sx={{
          textAlign: "center",
          mt: 2,
          color: "#66652",
        }}
      >
        Digite seus dados para entrar no sistema da loja
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
        }}
      >
        <TextField
          label="Digite o email"
          name="email"
          type="email"
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={(e) => setEmailfField(e.target.value)}
          value={emailField}
          disabled={loading}
        />

        <TextField
          label="Digite sua senha"
          name="password"
          type="password"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setPasswordField(e.target.value)}
          value={passwordField}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "carregando..." : "Entrar"}
        </Button>

        {error && (
          <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <MuiLink href="/login/forgot" variant="body2" component={Link}>
            Esqueceu sua senha???
          </MuiLink>
        </Box>
      </Box>
    </>
  );
}
