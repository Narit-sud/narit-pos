"use client";
import { getAuthService } from "./service";
import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from "react";
import type { AuthInterface } from "@/model/auth.interface";

type AuthContextType = {
    auth: AuthInterface | null; // Allow null state
};

type Props = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: Props) {
    const [auth, setAuth] = useState<AuthInterface | null>(null);

    async function loadAuth(): Promise<void> {
        try {
            const loadedAuth = await getAuthService();
            if (loadedAuth) {
                setAuth(loadedAuth);
            }
        } catch (error) {
            console.error("Error loading auth:", error);
        }
    }

    useEffect(() => {
        loadAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
