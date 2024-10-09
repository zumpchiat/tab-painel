"use client";

import ProductEditDialog from "@/components/ProductEditDialog";
import ProductTableItem from "@/components/ProductTableItem";
import ProductTableSkeleton from "@/components/ProductTableSkeleton";
import {
  delProduct,
  getCategories,
  getProducts as getProductsAPI,
} from "@/libs/api";
import { Category } from "@/types/Category";
import { Order } from "@/types/Order";
import { Product } from "@/types/Product";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [producttoDelete, setProducttoDelete] = useState<Product>();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product>();
  const [loadingEditDialog, setLoadingEditDialog] = useState(false);

  async function getProducts() {
    setLoading(true);
    setProducts([]);
    const categoryList: Category[] = await getCategories();
    setCategories(categoryList);
    const productList: Product[] = await getProductsAPI();
    setProducts(productList);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  //Delete Product
  function handleDeleteProduct(product: Product) {
    setProducttoDelete(product);
    setShowDeleteDialog(true);
  }
  async function handleConfirmDelete() {
    if (producttoDelete) {
      setLoadingDelete(true);
      await delProduct(producttoDelete.id);
      setLoadingDelete(false);
      setShowDeleteDialog(false);
      getProducts();
    }
  }

  //New/Edit Product

  const handleNewProduct = () => {
    setProductToEdit(undefined);
    setEditDialogOpen(true);
  };

  function handleEditProduct(product: Product) {
    setProductToEdit(product);
    setEditDialogOpen(true);
  }

  function handleSaveEditDialog() {}

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

        <Dialog
          open={showDeleteDialog}
          onClose={() => (!loadingDelete ? setLoadingDelete(false) : null)}
        >
          <DialogTitle>Deseja deletar o produto?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Procedimento não será desfeito.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={loadingDelete} onClick={handleConfirmDelete}>
              Sim
            </Button>
            <Button
              disabled={loadingDelete}
              onClick={() => setShowDeleteDialog(false)}
            >
              Não
            </Button>
          </DialogActions>
        </Dialog>
        <ProductEditDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSave={handleSaveEditDialog}
          disable={loadingEditDialog}
          product={productToEdit}
          categories={categories}
        />
      </Box>
    </>
  );
}
