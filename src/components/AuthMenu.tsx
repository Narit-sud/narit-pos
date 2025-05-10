import { useAuth } from "@/app/app/useAuth";
export default function AuthMenu() {
    const { auth } = useAuth();
    return <>{JSON.stringify(auth)}</>;
}
