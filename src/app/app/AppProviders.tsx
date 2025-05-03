import { BrandContextProvider } from "./brand/useBrand";
import { CategoryContextProvider } from "./category/useCategory";
export default function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CategoryContextProvider>
            <BrandContextProvider>{children}</BrandContextProvider>
        </CategoryContextProvider>
    );
}
