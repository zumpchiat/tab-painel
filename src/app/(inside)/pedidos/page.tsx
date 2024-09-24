"use client";

import { Grade, Refresh, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchInput = () => {
    //  setSearchInput(e.target.value);
  };

  const handleSearchKey = () => {};

  return (
    <>
      <Box sx={{ my: 3, mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component="h5"
              variant="h5"
              sx={{ color: "#555", mr: 2 }}
            >
              Pedidos
            </Typography>
            {loading && <CircularProgress size={24} />}
            {!loading && (
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
            )}
          </Box>

          <TextField
            value={searchInput}
            onChange={handleSearchInput}
            onKeyUp={handleSearchKey}
            placeholder="Pesquise um pedido"
            variant="standard"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid
          container
          spacing={3}
          columns={{ xs: 1, sm: 2, md: 4 }}
          sx={{ mt: 3 }}
        >
          {loading && (
            <>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
