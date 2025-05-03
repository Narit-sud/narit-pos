import { isAxiosError } from "axios";
import { LoginInterface } from "./interface";
import axiosInstance from "@/lib/axiosInstance";

export async function loginService(loginData: LoginInterface): Promise<void> {
  try {
    await axiosInstance.post("/auth/login", loginData);
  } catch (error) {
    throw error;
  }
}
