"use client";

import CategoryEditDialog from "@/components/CategoryEditDialog";
import CategoryTableItem from "@/components/CategoryTableItem";
import CategoryTableSkeleton from "@/components/CategoryTableSkeleton";
import {
  createCategory,
  delCategory,
  getCategories,
  updateCategory,
} from "@/libs/api";
import { Category } from "@/types/Category";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FormEvent, use, useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category>();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category>();
  const [loadingEditDialog, setLoadingEditDialog] = useState(false);

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

  //delete category
  function handleDeleteCategory(category: Category) {
    setCategoryToDelete(category);
    setShowDeleteDialog(true);
  }
  async function handleConfirmDelete() {
    if (categoryToDelete) {
      setLoadingDelete(true);
      await delCategory(categoryToDelete.id);
      setLoadingDelete(false);
      setShowDeleteDialog(false);
      getCatgoryiesPage();
    }
  }

  //Edit/New Category
  function handleNewCategory() {
    setCategoryToEdit(undefined);
    setEditDialogOpen(true);
  }

  function handleEditCategory(categories: Category) {
    setCategoryToEdit(categories);
    setEditDialogOpen(true);
  }

  async function handleSaveEditDialog(event: FormEvent<HTMLFormElement>) {
    let form = new FormData(event.currentTarget);

    setLoadingEditDialog(true);
    if (categoryToEdit) {
      form.append("id", categoryToEdit.id.toString());
      await updateCategory(form);
    } else {
      await createCategory(form);
    }

    setLoadingEditDialog(false);
    setEditDialogOpen(false);
    getCategories();
  }

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
                  onDelete={handleDeleteCategory}
                />
              ))}
          </TableBody>
        </Table>

        <Dialog
          open={showDeleteDialog}
          onClose={() => (!loadingDelete ? setLoadingDelete(false) : null)}
        >
          <DialogTitle>Deseja deletar a categoria?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Procedimento não poderá ser desfeito.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loadingDelete}
              onClick={() => setShowDeleteDialog(false)}
            >
              não
            </Button>
            <Button disabled={loadingDelete} onClick={handleConfirmDelete}>
              sim
            </Button>
          </DialogActions>
        </Dialog>
        <CategoryEditDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSave={handleSaveEditDialog}
          disable={loadingEditDialog}
          category={categoryToEdit}
        />
      </Box>
    </>
  );
}
