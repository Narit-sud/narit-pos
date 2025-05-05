import { v4 as uuidv4 } from "uuid";

export interface StoreInterface {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}
export interface StoreUserInterface {
    id: string;
    name: string;
    permission: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export interface NewStoreInterface {
    id: string;
    name: string;
}

export function createStoreInterface(
    store: StoreUserInterface[] | undefined
): StoreUserInterface[] {
    return store?.map((storeData) => ({
        id: storeData.id || uuidv4(),
        name: storeData.name || "",
        permission: storeData.permission || "",
        createdAt: storeData.createdAt || "",
        updatedAt: storeData.updatedAt || "",
        createdBy: storeData.createdBy || "",
        updatedBy: storeData.updatedBy || "",
    })) as StoreUserInterface[];
}

export function createNewStoreInterface(
    newStore: Partial<NewStoreInterface>
): NewStoreInterface {
    return {
        id: newStore.id || uuidv4(),
        name: newStore.name || "",
    };
}
