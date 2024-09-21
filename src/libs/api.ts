import { resolve } from "path";

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
