import { ConstraintErrorInterface } from "@/model/constraintError.interface";
/**
 * Handles backend errors and converts them to HTTP responses
 * @param error - The error object from the backend
 * @param possibleConstraintErrors - Array of possible constraint errors with their messages and status codes
 * @param errorLocation - Location where the error occurred (for logging)
 * @returns Response object with appropriate error message and status code
 */
export function handleBackendError(
    error: any,
    possibleConstraintErrors: ConstraintErrorInterface[],
    errorLocation: string
): Response {
    console.log(possibleConstraintErrors);
    const constraintError = possibleConstraintErrors.find(
        (constraint) => constraint.name === error.constraint
    );
    console.log(errorLocation || "/api/****", error);
    return Response.json(
        { message: constraintError?.message || "Internal server error" },
        { status: constraintError?.code || 500 }
    );
}
