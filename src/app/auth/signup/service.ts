import { apiUrl } from "@/lib/constants";
import { SignupInterface } from "@/model/signup.interface";

export async function signupService(
    signupData: SignupInterface
): Promise<boolean> {
    try {
        const response = await fetch(apiUrl + "/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
        });
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                return true;
            }
        } else {
            throw new Error("Network response was not ok");
        }
        return false;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
