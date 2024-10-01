"use client";

import { OrderItem } from "@/components/OrderItem";
import { changeOrderStatus, getOrders } from "@/libs/api";
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
      <Box sx={{ my: 3, mt: 4 }}>
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
                <OrderItem item={item} onChangeStatus={handleStatusChange} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
