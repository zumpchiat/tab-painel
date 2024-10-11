import { Category } from "@/types/Category";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";

interface Props {
  item: Category;
  onEdit?: (item: Category) => void;
  onDelete: (item: Category) => void;
}

export default function CategoryTableItem({ item, onEdit, onDelete }: Props) {
  return (
    <>
      <TableRow hover>
        <TableCell
          sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}
        >
          {item.id}
        </TableCell>

        <TableCell>
          <Typography component="strong">{item.nome}</Typography>
        </TableCell>

        <TableCell sx={{ width: { xs: 50, md: 130 } }}>
          <Button onClick={() => onDelete(item)} size="small">
            <Delete />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
