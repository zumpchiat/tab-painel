import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FormEvent } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  categories: Category[];
  product?: Product;
  disable?: boolean;
}
export default function ProductEditDialog({
  open,
  onClose,
  onSave,
  categories,
  product,
  disable,
}: Props) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {!product ? "Novo Produto" : "Editando Produto"}
        </DialogTitle>
        <DialogContent>....</DialogContent>
      </Dialog>
    </>
  );
}
