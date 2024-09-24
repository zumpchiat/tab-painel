"use client";

import { Refresh, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchKey = () => {};

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component="h5"
              variant="h5"
              sx={{ color: "#555", mr: 2 }}
            >
              Pedidos
            </Typography>
            <Button
              size="small"
              sx={{ justifyContent: { xs: "flex-start", md: "center" } }}
            >
              <Refresh />
              <Typography
                component="div"
                sx={{ color: "#555", display: { xs: "none", md: "block" } }}
              >
                Atualizar
              </Typography>
            </Button>
          </Box>

          <TextField
            value={searchInput}
            onChange={handleSearchInput}
            onKeyUp={handleSearchKey}
            placeholder="Pesquise um pedido"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </>
  );
}
