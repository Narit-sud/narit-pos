import { BrandContextProvider } from "./brand/useBrand";
import { CategoryContextProvider } from "./category/useCategory";
import { CustomerContextProvider } from "./customer/useCustomer";
import { ProductContextProvider } from "./product/useProduct";
import { SupplierContextProvider } from "./supplier/useSupplier";
import { AuthContextProvider } from "./useAuth";

export default function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthContextProvider>
            <CategoryContextProvider>
                <BrandContextProvider>
                    <ProductContextProvider>
                        <CustomerContextProvider>
                            <SupplierContextProvider>
                                {children}
                            </SupplierContextProvider>
                        </CustomerContextProvider>
                    </ProductContextProvider>
                </BrandContextProvider>
            </CategoryContextProvider>
        </AuthContextProvider>
    );
}
