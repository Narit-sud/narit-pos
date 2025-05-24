import { v4 as uuidv4 } from "uuid";

export class NewBrand {
    id: string;
    name: string;
    detail: string;
    categoryId: string;
    constructor(brand: Partial<NewBrand>) {
        this.id = brand.id || uuidv4();
        this.name = brand.name || "";
        this.detail = brand.detail || "";
        this.categoryId = brand.categoryId || "";
    }
    public toJsonString() {
        return JSON.stringify(this);
    }
    public logger() {
        console.log(this);
    }
}

export class Brand extends NewBrand {
    category: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    constructor(brand: Partial<Brand>) {
        super(brand);
        this.category = brand.category || "";
        this.createdAt = brand.createdAt || "";
        this.updatedAt = brand.updatedAt || "";
        this.createdBy = brand.createdBy || "";
        this.updatedBy = brand.updatedBy || "";
    }
}
