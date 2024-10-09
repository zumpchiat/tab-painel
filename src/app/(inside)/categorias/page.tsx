"use client";

import CategoryTableSkeleton from "@/components/CategoryTableSkeleton";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

function handleNewCategory() {}

export default function Page() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Box sx={{ my: 3, mt: 4, displayPrint: "none" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h5" variant="h5" sx={{ color: "#555", mr: 2 }}>
            Categorias
          </Typography>
          <Button onClick={handleNewCategory}>Nova Categoria</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}
              >
                ID
              </TableCell>

              <TableCell>Nome</TableCell>

              <TableCell sx={{ width: { xs: 50, md: 130 } }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <>
                <CategoryTableSkeleton />
                <CategoryTableSkeleton />
                <CategoryTableSkeleton />
              </>
            )}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
