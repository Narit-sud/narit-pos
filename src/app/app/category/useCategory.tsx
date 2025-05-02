"use client";
import { getCategoryService } from "./components/service";
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
    loadCategories: () => Promise<void>;
};

type Props = {
    children: ReactNode;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
    undefined
);

export function CategoryContextProvider({ children }: Props) {
    const [categories, setCategories] = useState<CategoryInterface[]>([]);

    async function loadCategories(): Promise<void> {
        try {
            const loadedCategories = await getCategoryService();
            if (loadedCategories) {
                setCategories(loadedCategories);
            }
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loadCategories }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategory() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
}
