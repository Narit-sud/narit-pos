export interface LoginInterface {
    username: string;
    password: string;
}

export function createLoginData(data: LoginInterface): LoginInterface {
    return {
        username: data.username || "",
        password: data.password || "",
    };
}
