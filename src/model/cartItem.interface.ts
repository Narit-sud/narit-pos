import { ProductInterface } from "./product.interface";

export type CartItemInterface = {
    product: ProductInterface;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    comment?: string; // Optional item-specific comment
};
