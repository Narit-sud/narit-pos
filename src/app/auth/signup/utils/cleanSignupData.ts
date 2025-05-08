import { SignupInterface } from "@/model/signup.interface";

export function cleanSignupData(data: SignupInterface): SignupInterface {
    function firstUpperCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    }
    return {
        id: data.id.trim(),
        name: firstUpperCase(data.name.trim()),
        surname: firstUpperCase(data.surname.trim()),
        email: data.email.trim(),
        username: data.username.trim().toLowerCase(),
        password: data.password.trim(),
        phoneNumber: data.phoneNumber.trim(),
    };
}
