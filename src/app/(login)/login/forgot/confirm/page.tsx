"use client";

import { confirmPassword } from "@/libs/api";

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";

import { FormEvent, useState } from "react";

export default function login() {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordField, setPasswordField] = useState("");
  const [passwordField2, setPasswordField2] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordField || !passwordField2) {
      setError("Preencha todos os campos!");
      return;
    }
    if (passwordField !== passwordField2) {
      setError("As senha são diferentes!");
      return;
    }

    if (passwordField.length < 4) {
      setError("A senha não pode ser menor que 4 caracteres");
      return;
    }
    setError("");
    setLoading(true);
    //fazer consulta na api
    const result = await confirmPassword(passwordField, "123");

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setInfo("Senha alterada com sucesso, faça login no sistema.");
      setPasswordField("");
      setPasswordField2("");
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
        Olá ** USER **, defina sua nova senha.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          textAlign: "center",
        }}
      >
        <TextField
          label="Digite sua nova senha"
          name="password"
          type="password"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setPasswordField(e.target.value)}
          value={passwordField}
          disabled={loading}
        />
        <TextField
          label="Digite sua nova senha"
          name="password2"
          type="password"
          required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setPasswordField2(e.target.value)}
          value={passwordField2}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "carregando..." : "Redefinir senha"}
        </Button>

        {error && (
          <Alert variant="filled" severity="error" sx={{ mt: 3, mb: 4 }}>
            {error}
          </Alert>
        )}
        {info && (
          <Alert variant="filled" severity="success" sx={{ mt: 3, mb: 4 }}>
            {info}
          </Alert>
        )}
        <MuiLink href="/login" component={Link} variant="button">
          Fazer Login no sistema?
        </MuiLink>
      </Box>
    </>
  );
}
