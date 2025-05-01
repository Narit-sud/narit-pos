"use client";
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react";
import type { CategoryInterface } from "@/model/category.interface";

type CategoryContextType = {
    categories: CategoryInterface[];
};

type Props = {
    children: ReactNode;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
    undefined,
);

export function CategoryContextProvider({ children }: Props) {
    const [categories, setCategories] = useState<CategoryInterface[]>([]);

    async function initialize() {
        // load categories from api}

        useEffect(() => {
            initialize();
        }, []);

        return (
            <CategoryContext.Provider value={{ categories }}>
                {children}
            </CategoryContext.Provider>
        );
    }
}

export function useCategoryContext() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
}
