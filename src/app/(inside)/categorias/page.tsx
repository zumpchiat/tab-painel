"use client";

import CategoryTableItem from "@/components/CategoryTableItem";
import CategoryTableSkeleton from "@/components/CategoryTableSkeleton";
import { getCategories } from "@/libs/api";
import { Category } from "@/types/Category";
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
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  //get category

  async function getCatgoryiesPage() {
    setLoading(false);
    setCategories([]);
    const listCategory: Category[] = await getCategories();
    setCategories(listCategory);
    setLoading(false);
  }

  useEffect(() => {
    getCatgoryiesPage();
  }, []);

  function handleNewCategory() {}
  function handleDeleteCategory() {}
  function handleEditCategory() {}

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
            {!loading &&
              categories.map((item) => (
                <CategoryTableItem
                  key={item.id}
                  item={item}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
