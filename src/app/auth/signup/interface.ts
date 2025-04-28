import { v4 as uuidv4 } from "uuid";

export interface SignupInterface {
    id: string;
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
}

export function createSignupData(data: SignupInterface): SignupInterface {
    return {
        id: data.id || uuidv4(),
        name: data.name || "",
        surname: data.surname || "",
        email: data.email || "",
        username: data.username || "",
        password: data.password || "",
        phoneNumber: data.phoneNumber || "",
    };
}
