import axiosInstance from "@/lib/axiosInstance";
import { isAxiosError } from "axios";
import { SignupInterface } from "@/model/signup.interface";

export async function signupService(
    signupData: SignupInterface
): Promise<void> {
    try {
        await axiosInstance.post("/auth/signup", signupData);
    } catch (error) {
        if (isAxiosError(error)) {
            console.error(
                "Signup service error:",
                error.response?.data || error.response
            );

            // Handle specific error responses
            if (error.response) {
                const status = error.response.status;
                const errorMessage =
                    error.response.data?.message || "Signup failed";

                if (status === 409) {
                    throw new Error(
                        `${errorMessage} Please use different credentials.`
                    );
                } else if (status === 400) {
                    throw new Error(errorMessage);
                }
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error(
                    "Network error. Please check your connection and try again."
                );
            }

            // If no specific error handling matches, throw the original error
            throw error;
        }

        // For non-Axios errors
        throw new Error(
            "An unexpected error occurred during signup. Please try again."
        );
    }
}
