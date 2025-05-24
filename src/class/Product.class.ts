import { v4 as uuidv4 } from "uuid";

export class NewProduct {
    id: string;
    name: string;
    cost: number;
    price: number;
    stock: number;
    brandId: string;
    detail: string;
    constructor(product: Partial<NewProduct>) {
        this.id = product.id || uuidv4();
        this.name = product.name || "";
        this.cost = product.cost || 0;
        this.price = product.price || 0;
        this.stock = product.stock || 0;
        this.brandId = product.brandId || "";
        this.detail = product.detail || "";
    }
    public toJsonString() {
        return JSON.stringify(this);
    }
    public logger() {
        console.log(this);
    }
}

export class UpdateProduct extends NewProduct {
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    constructor(product: Partial<UpdateProduct>) {
        super(product);
        this.createdAt = product.createdAt || "";
        this.updatedAt = product.updatedAt || "";
        this.createdBy = product.createdBy || "";
        this.updatedBy = product.updatedBy || "";
    }
}

export class Product extends UpdateProduct {
    brand: string;
    category: string;
    constructor(product: Partial<Product>) {
        super(product);
        this.brand = product.brand || "";
        this.category = product.category || "";
    }
    public createProps() {
        return new NewProduct({
            id: this.id,
            name: this.name,
            cost: this.cost,
            price: this.price,
            stock: this.stock,
            brandId: this.brandId,
            detail: this.detail,
        });
    }
    public updateProps() {
        return new UpdateProduct({
            id: this.id,
            name: this.name,
            cost: this.cost,
            price: this.price,
            brandId: this.brandId,
            detail: this.detail,
        });
    }
}
