import { v4 as uuidv4 } from "uuid";

export class NewCategory {
    id: string;
    name: string;
    detail: string;
    constructor(category: Partial<NewCategory>) {
        this.id = category.id || uuidv4();
        this.name = category.name || "";
        this.detail = category.detail || "";
    }
    public toJsonString() {
        return JSON.stringify(this);
    }
    public logger() {
        console.log(this);
    }
}

export class Category extends NewCategory {
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    constructor(category: Partial<Category>) {
        super(category);
        this.createdAt = category.createdAt || "";
        this.updatedAt = category.updatedAt || "";
        this.createdBy = category.createdBy || "";
        this.updatedBy = category.updatedBy || "";
    }
    public updateProps() {
        return new NewCategory({
            id: this.id,
            name: this.name,
            detail: this.detail,
        });
    }
}
