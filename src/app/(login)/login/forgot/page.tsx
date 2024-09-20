"use client";

import { forgotPassword } from "@/libs/api";

import { Box, Button, TextField, Typography, Alert } from "@mui/material";

import { FormEvent, useState } from "react";

export default function login() {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailField, setEmailfField] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailField) {
      setError("Preencha seu email!");
      return;
    }
    setError("");
    setLoading(true);
    //fazer consulta na api
    const result = await forgotPassword(emailField);

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setInfo("Enviamos no seu email o link para alteração de senha.");
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
        Deseja recuperar sua senha?
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "carregando..." : "Recuperar"}
        </Button>

        {error && (
          <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
        {info && (
          <Alert variant="filled" severity="info" sx={{ mt: 3 }}>
            {info}
          </Alert>
        )}
      </Box>
    </>
  );
}
