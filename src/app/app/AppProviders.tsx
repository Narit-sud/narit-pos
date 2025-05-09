import { BrandContextProvider } from "./brand/useBrand";
import { CategoryContextProvider } from "./category/useCategory";
import { CustomerContextProvider } from "./customer/useCustomer";
import { ProductContextProvider } from "./product/useProduct";

export default function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CategoryContextProvider>
            <BrandContextProvider>
                <ProductContextProvider>
                    <CustomerContextProvider>
                        {children}
                    </CustomerContextProvider>
                </ProductContextProvider>
            </BrandContextProvider>
        </CategoryContextProvider>
    );
}
