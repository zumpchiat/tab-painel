import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(event);
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>
          {!product ? "Novo Produto" : "Editando Produto"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <Box sx={{ mb: 2 }}>
              <InputLabel variant="standard" htmlFor="imgField">
                Imagem
              </InputLabel>
              <Input
                id="imgField"
                name="image"
                type="file"
                fullWidth
                disabled={disable}
                inputProps={{ accept: "image/*" }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <InputLabel variant="standard" htmlFor="nameField">
                Nome
              </InputLabel>
              <TextField
                id="nameField"
                variant="standard"
                name="name"
                defaultValue={product?.name}
                required
                fullWidth
                disabled={disable}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <InputLabel variant="standard" htmlFor="priceField">
                Preço (em R$)
              </InputLabel>
              <TextField
                id="priceField"
                variant="standard"
                type="number"
                name="price"
                defaultValue={product?.price}
                required
                fullWidth
                disabled={disable}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <InputLabel variant="standard" htmlFor="descriptionField">
                Descrição
              </InputLabel>
              <TextField
                id="descriptionField"
                variant="standard"
                name="description"
                defaultValue={product?.description}
                multiline
                rows={4}
                required
                fullWidth
                disabled={disable}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <InputLabel variant="standard" htmlFor="catField">
                Categoria
              </InputLabel>
              <Select
                id="catField"
                variant="standard"
                name="category"
                defaultValue={product?.category.id || categories[0]?.id}
                required
                fullWidth
                disabled={disable}
              >
                <MenuItem
                  key={product?.category.id}
                  value={product?.category.id}
                >
                  {product?.category.nome}
                </MenuItem>
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nome}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button disabled={disable} onClick={onClose}>
                Cancelar
              </Button>
              <Button disabled={disable} type="submit">
                Salvar
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
