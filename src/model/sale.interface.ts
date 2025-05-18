import { CartItemInterface } from "@/model/cartItem.interface";

export interface SaleInterface {
    items: CartItemInterface[];
    customerId: string | null;
    paymentMethod: string;
    detail: string;
    total: number;
}
