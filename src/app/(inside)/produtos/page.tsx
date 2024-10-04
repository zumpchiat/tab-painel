"use client";

import ProductTableItem from "@/components/ProductTableItem";
import ProductTableSkeleton from "@/components/ProductTableSkeleton";
import { getCategories, getProducts as getProductsAPI } from "@/libs/api";
import { Category } from "@/types/Category";
import { Order } from "@/types/Order";
import { Product } from "@/types/Product";
import {
  Box,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const handleNewProduct = () => {};

  async function getProducts() {
    setLoading(true);
    setProducts([]);
    const categoryList: Category[] = await getCategories();
    setCategories(categoryList);
    const productList: Product[] = await getProductsAPI();
    setProducts(productList);
    setLoading(false);
  }

  function handleEditProduct(product: Product) {}
  function handleDeleteProduct(product: Product) {}

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Box sx={{ my: 3, mt: 4, displayPrint: "none" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h5" variant="h5" sx={{ color: "#555", mr: 2 }}>
            Produtos
          </Typography>
          <Button onClick={handleNewProduct}>Novo Produto</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}
              >
                ID
              </TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Preço
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Categoria
              </TableCell>
              <TableCell sx={{ width: { xs: 50, md: 130 } }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <>
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
              </>
            )}
            {!loading &&
              products.map((item) => (
                <ProductTableItem
                  key={item.id}
                  item={item}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
