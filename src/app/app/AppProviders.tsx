import { CategoryContextProvider } from "./category/useCategory";
export default function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CategoryContextProvider>{children}</CategoryContextProvider>;
}
