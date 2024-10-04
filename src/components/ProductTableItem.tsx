import { Product } from "@/types/Product";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";

interface Props {
  item: Product;
  onEdit: (item: Product) => void;
  onDelete: (item: Product) => void;
}

export default function ProductTableItem({ item, onEdit, onDelete }: Props) {
  return (
    <>
      <TableRow hover>
        <TableCell
          sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}
        >
          {item.id}
        </TableCell>
        <TableCell sx={{ width: { xs: 50, md: 100 } }}>
          <img src={item.image} alt="" width="100%" />
        </TableCell>
        <TableCell>
          <Typography component="strong">{item.name}</Typography>
          <Box sx={{ display: { md: "none" } }}>R$ {item.price.toFixed(2)}</Box>
        </TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
          R$ {item.price.toFixed(2)}
        </TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
          {item.category.nome}
        </TableCell>
        <TableCell sx={{ width: { xs: 50, md: 130 } }}>
          <Button onClick={() => onEdit(item)} size="small">
            <Edit />
          </Button>
          <Button onClick={() => onDelete(item)} size="small">
            <Delete />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
