import axiosInstance from "@/lib/axiosInstance";
import { EmployeeInterface } from "@/model/employee.interface";

export async function getEmployeePermissionList(): Promise<
    EmployeeInterface[]
> {
    try {
        const response = await axiosInstance.get("/employee");
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
