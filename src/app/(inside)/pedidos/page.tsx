"use client";

import { OrderItem } from "@/components/OrderItem";
import { changeOrderStatus, getOrders } from "@/libs/api";
import { dateFormat } from "@/libs/dateFormat";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Refresh, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function Page() {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [printerOrder, setPrinterOrder] = useState<Order | null>(null);

  const getOrdersPage = async () => {
    setSearchInput("");
    setOrders([]);

    setLoading(true);
    const ordersList: Order[] = await getOrders();
    setOrders(ordersList);
    setLoading(false);
  };

  const handleStatusChange = async (id: number, newStatus: OrderStatus) => {
    await changeOrderStatus(id, newStatus);
    getOrdersPage();
  };

  const handlePrintAction = (order: Order) => {
    setPrinterOrder(order);
    setTimeout(() => {
      if (window) window.print();
    }, 200);
  };
  const handleSearchKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.code);
    if (
      event.code.toLowerCase() === "enter" ||
      event.code.toLowerCase() === "numpadenter"
    ) {
      if (searchInput != "") {
        let newOrders: Order[] = [];
        for (let i in orders) {
          if (orders[i].id.toString() === searchInput) {
            newOrders.push(orders[i]);
          }
        }
        setFilteredOrders(newOrders);
      } else {
        setFilteredOrders(orders);
      }
    }
  };

  useEffect(() => {
    getOrdersPage();
  }, []);

  useEffect(() => {
    setSearchInput("");
    setFilteredOrders(orders);
  }, [orders]);

  return (
    <>
      <Box sx={{ my: 3, mt: 4, displayPrint: "none" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component="h5"
              variant="h5"
              sx={{ color: "#555", mr: 2 }}
            >
              Pedidos
            </Typography>
            {loading && <CircularProgress size={24} />}
            {!loading && (
              <Button
                onClick={getOrdersPage}
                size="small"
                sx={{ justifyContent: { xs: "flex-start", md: "center" } }}
              >
                <Refresh />
                <Typography
                  component="div"
                  sx={{ color: "#555", display: { xs: "none", md: "block" } }}
                >
                  Atualizar
                </Typography>
              </Button>
            )}
          </Box>

          <TextField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleSearchKey}
            placeholder="Pesquise um pedido"
            variant="standard"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid
          container
          spacing={3}
          columns={{ xs: 1, sm: 2, md: 4 }}
          sx={{ mt: 3 }}
        >
          {loading && (
            <>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
            </>
          )}
          {!loading &&
            filteredOrders.map((item, index) => (
              <Grid key={index} item xs={1}>
                <OrderItem
                  item={item}
                  onChangeStatus={handleStatusChange}
                  onPrint={handlePrintAction}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box sx={{ display: "none", displayPrint: "block" }}>
        {printerOrder && (
          <>
            <Typography component={"h5"} variant="h5">
              Pedido #{printerOrder.id}
            </Typography>
            <Box>Cliente: {printerOrder.username}</Box>
            <Box>data: {dateFormat(printerOrder.orderDate)}</Box>

            <Typography component={"h5"} variant="h5">
              Itens:
            </Typography>
            {printerOrder.products.map((item, index) => (
              <Box key={index}>
                {item.qt} x {item.product.name}
              </Box>
            ))}

            <Typography component={"h5"} variant="h5">
              Pagamento
            </Typography>
            <Box>
              Pagamento em:{" "}
              {printerOrder.paymentType === "card" ? "Cartão" : "Dinheiro"}
            </Box>
            <Box>SubTotal: R$ {printerOrder.subtotal.toFixed(2)}</Box>
            <Box>Entrega: R$ {printerOrder.shippingPrice.toFixed(2)}</Box>
            {printerOrder.cupomDiscount && (
              <Box> Desconto: - R$ {printerOrder.cupomDiscount.toFixed(2)}</Box>
            )}
            <Box>Total: R$ {printerOrder.total.toFixed(2)}</Box>

            <Typography component={"h5"} variant="h5">
              Local
            </Typography>
            <Box>Rua:{printerOrder.shippingAddress.address}</Box>
            <Box>n°:{printerOrder.shippingAddress.number}</Box>
            <Box>Obs:{printerOrder.shippingAddress.complement}</Box>
            <Box>CEP:{printerOrder.shippingAddress.cep}</Box>
            <Box>Bairro:{printerOrder.shippingAddress.neighborhood}</Box>
            <Box>Cidade:{printerOrder.shippingAddress.city}</Box>
            <Box>Estado:{printerOrder.shippingAddress.state}</Box>
          </>
        )}
      </Box>
    </>
  );
}
