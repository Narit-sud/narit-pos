import { getCookie } from "./cookie";

export async function getStoreId(): Promise<string | Response> {
    try {
        const { storeId } = await getCookie("storeId");
        if (!storeId) {
            return new Response("Store ID not found", { status: 404 });
        }
        return storeId as string;
    } catch (error) {
        return Response.json({ message: "Invalid store ID" }, { status: 500 });
    }
}
