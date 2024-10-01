import { dateFormat } from "@/libs/dateFormat";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

//export default function OrderItem(props: Order) {
// return <Box> {props.username}</Box>;
//}

type Props = {
  item: Order;
  onChangeStatus: (id: number, newStatus: OrderStatus) => void;
  onPrint: (order: Order) => void;
};

export const OrderItem = ({ item, onChangeStatus, onPrint }: Props) => {
  const getStatusBackgraound = (status: OrderStatus) => {
    const statuses = {
      preparing: "#2787ba",
      sent: "#27BA3A",
      delivered: "#999999",
    };
    return statuses[status];
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    onChangeStatus(item.id, event.target.value as OrderStatus);
  };

  const handlePrintButton = () => {
    onPrint(item);
  };

  return (
    <Box
      sx={{
        border: "1px solid #EEE",
        color: "#FFF",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          backgroundColor: getStatusBackgraound(item.status),
        }}
      >
        <Box>
          <Typography component={"p"}> {dateFormat(item.orderDate)}</Typography>
          <Typography component={"p"}> {item.username}</Typography>
          <Button
            onClick={handlePrintButton}
            size="small"
            sx={{ color: "#FFF", p: 0 }}
          >
            Imprimir <LocalPrintshopIcon />
          </Button>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 24 }} component="p">
            #{item.id}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 1, backgroundColor: "#FFF" }}>
        {item.products.map((producItem, index) => (
          <Typography
            key={index}
            component="p"
            sx={{
              p: 1,
              color: "#000",
              fontWeight: "bold",
              borderBottom: "1px solid #ccc",
            }}
          >
            {`${producItem.qt}x  (${producItem.product.name})`}
          </Typography>
        ))}
      </Box>
      <Box sx={{ p: 1, backgroundColor: "#EEE" }}>
        <Select
          variant="standard"
          value={item.status}
          fullWidth
          onChange={handleStatusChange}
        >
          <MenuItem value="preparing">Preparando</MenuItem>
          <MenuItem value="sent">Enviado</MenuItem>
          <MenuItem value="delivered">Entregue</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};
