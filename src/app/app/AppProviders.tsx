import { BrandContextProvider } from "./brand/useBrand";
import { CategoryContextProvider } from "./category/useCategory";
import { ProductContextProvider } from "./product/useProduct";

export default function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CategoryContextProvider>
            <BrandContextProvider>
                <ProductContextProvider>{children}</ProductContextProvider>
            </BrandContextProvider>
        </CategoryContextProvider>
    );
}
