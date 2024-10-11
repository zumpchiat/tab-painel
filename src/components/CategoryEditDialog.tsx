import { Category } from "@/types/Category";

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
  category?: Category;
  disable?: boolean;
}
export default function CategoryEditDialog({
  open,
  onClose,
  onSave,

  category,
  disable,
}: Props) {
  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(event);
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Nova categoria</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <Box sx={{ mb: 2 }}>
              <InputLabel variant="standard" htmlFor="nameField">
                Nome da categoria
              </InputLabel>
              <TextField
                id="nameField"
                variant="standard"
                name="name"
                defaultValue={category?.nome}
                required
                fullWidth
                disabled={disable}
              />
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
