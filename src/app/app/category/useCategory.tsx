"use client";
import {
    createCategoryService,
    getCategoryService,
    updateCategoryService,
} from "./service";
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react";
import type {
    CategoryInterface,
    NewCategoryInterface,
} from "@/model/category.interface";

type CategoryContextType = {
    categories: CategoryInterface[];
    loadCategories: () => Promise<void>;
    createCategory: (newCategory: NewCategoryInterface) => Promise<void>;
    updateCategory: (updatedCategory: CategoryInterface) => Promise<void>;
};

type Props = {
    children: ReactNode;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
    undefined,
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

    async function createCategory(newCategory: NewCategoryInterface) {
        try {
            await createCategoryService(newCategory);
            await loadCategories(); // Refresh categories after creation
        } catch (error) {
            throw error;
        }
    }

    async function updateCategory(updatedCategory: CategoryInterface) {
        try {
            await updateCategoryService(updatedCategory);
            await loadCategories(); // Refresh categories after update
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                createCategory,
                updateCategory,
                loadCategories,
            }}
        >
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
