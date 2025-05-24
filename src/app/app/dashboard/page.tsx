import { Product } from "@/class/Product.class";
export default function Page() {
    const newProduct = new Product({ id: "1234" });
    return <div>{newProduct.toJsonString()}</div>;
}
