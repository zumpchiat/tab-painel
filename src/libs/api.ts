import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";

const tmpProduct: Product = {
  id: 999,
  image: "https://sachefmio.blob.core.windows.net/fotos/x-tudo-duplo-73523.jpg",
  category: {
    id: 88,
    nome: "Burgers",
  },
  name: "X-TUDO-DUPLO",
  price: 17.0,
  description: "2 Carnes, 2 Ovos, Bacon, queijo, presunto, salsicha e molho",
};

export default async function api(
  email: string,
  senha: string
): Promise<{ error: string; token: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email !== "admin@gmail.com") {
        resolve({
          error: "Dados de login incorretos!!!",
          token: "",
        });
      } else {
        resolve({
          error: "",
          token: "123",
        });
      }
    }, 1000);
  });
}

export async function forgotPassword(
  email: string
): Promise<{ error: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        error: "",
      });
    }, 1000);
  });
}

export async function confirmPassword(
  senha: string,
  token: string
): Promise<{ error: string; token: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        error: "",
        token: "",
      });
    }, 2000);
  });
}

export async function getOrders(): Promise<Order[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders: Order[] = [];
      const statuses: OrderStatus[] = ["preparing", "sent", "delivered"];
      // montar array de pedidos
      for (let i = 0; i < 106; i++) {
        orders.push({
          id: parseInt("12" + i),
          status: statuses[Math.floor(Math.random() * 3)],
          orderDate: "2024-01-03 19:45",
          userid: "1",
          username: "Pedro",
          shippingAddress: {
            id: 99,
            cep: "99999999",
            address: "Rua Rio Branco",
            number: "1200",
            neighborhood: "Algun",
            city: "Rio de Janeiro",
            state: "RJ",
            complement: "AP 334",
          },
          shippingPrice: 12,
          paymentType: "card",
          changeValue: 0,
          cupom: "FFF12",
          cupomDiscount: 2,
          products: [
            { qt: 2, product: tmpProduct },
            { qt: 3, product: { ...tmpProduct, id: 777, name: "X-SALADA" } },
          ],
          subtotal: 99,
          total: 120,
        });
      }

      resolve(orders);
    }, 5);
  });
}

export async function changeOrderStatus(id: number, newStatus: OrderStatus) {
  return true;
}
