"use client";
import { ProductInterface } from "@/model/product.interface";
import { CustomerInterface } from "@/model/customer.interface";
import { createContext, useContext, useState, ReactNode } from "react";
import { useProduct } from "../product/useProduct";
import { useCustomer } from "../customer/useCustomer";

export type CartItemInterface = {
    product: ProductInterface;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
};

type PaymentMethod = "cash" | "transfer";

type PosContextType = {
    cartItems: CartItemInterface[];
    selectedProduct: ProductInterface | null;
    isProductPanelOpen: boolean;
    isChargePanelOpen: boolean;
    selectedCustomer: CustomerInterface | null;
    paymentMethod: PaymentMethod;
    amountPaid: number;
    changeAmount: number;

    // Methods
    openProductPanel: (product: ProductInterface) => void;
    closeProductPanel: () => void;
    openChargePanel: () => void;
    closeChargePanel: () => void;
    addToCart: (item: CartItemInterface) => void;
    updateCartItem: (index: number, updatedItem: CartItemInterface) => void;
    removeFromCart: (index: number) => void;
    clearCart: () => void;
    selectCustomer: (customer: CustomerInterface) => void;
    setPaymentMethod: (method: PaymentMethod) => void;
    setAmountPaid: (amount: number) => void;
    getCartTotal: () => number;
    getChangeAmount: () => number;
    processPayment: () => Promise<void>;
};

const PosContext = createContext<PosContextType | undefined>(undefined);

type PosProviderProps = {
    children: ReactNode;
};

export function PosProvider({ children }: PosProviderProps) {
    // Get products and customers from their contexts
    const { products } = useProduct();
    const { customers } = useCustomer();

    // Cart state
    const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);

    // Product selection state
    const [selectedProduct, setSelectedProduct] =
        useState<ProductInterface | null>(null);
    const [isProductPanelOpen, setIsProductPanelOpen] = useState(false);

    // Charge panel state
    const [isChargePanelOpen, setIsChargePanelOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] =
        useState<CustomerInterface | null>(
            customers.length > 0 ? customers[0] : null
        );
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [amountPaid, setAmountPaid] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);

    // Product selection panel functions
    const openProductPanel = (product: ProductInterface) => {
        setSelectedProduct(product);
        setIsProductPanelOpen(true);
    };

    const closeProductPanel = () => {
        setSelectedProduct(null);
        setIsProductPanelOpen(false);
    };

    // Cart functions
    const addToCart = (item: CartItemInterface) => {
        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(
            (cartItem) => cartItem.product.id === item.product.id
        );

        if (existingItemIndex !== -1) {
            // Update existing item
            const updatedCartItems = [...cartItems];
            const existingItem = updatedCartItems[existingItemIndex];

            updatedCartItems[existingItemIndex] = {
                ...existingItem,
                quantity: existingItem.quantity + item.quantity,
                totalPrice:
                    (existingItem.quantity + item.quantity) * item.unitPrice,
            };

            setCartItems(updatedCartItems);
        } else {
            // Add new item
            setCartItems([...cartItems, item]);
        }

        closeProductPanel();
    };

    const updateCartItem = (index: number, updatedItem: CartItemInterface) => {
        const newCartItems = [...cartItems];
        newCartItems[index] = updatedItem;
        setCartItems(newCartItems);
    };

    const removeFromCart = (index: number) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Charge panel functions
    const openChargePanel = () => {
        setIsChargePanelOpen(true);
    };

    const closeChargePanel = () => {
        setIsChargePanelOpen(false);
    };

    const selectCustomer = (customer: CustomerInterface) => {
        setSelectedCustomer(customer);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0);
    };

    const getChangeAmount = () => {
        return amountPaid - getCartTotal();
    };

    // Process payment and create order
    const processPayment = async () => {
        // This would typically connect to your API to process the payment
        // and create an order record in your database
        console.log("Processing payment:", {
            cartItems,
            customer: selectedCustomer,
            paymentMethod,
            amountPaid,
            changeAmount: getChangeAmount(),
            total: getCartTotal(),
        });

        // Reset the POS for a new transaction
        clearCart();
        closeChargePanel();
        setAmountPaid(0);
        setPaymentMethod("cash");

        // You would typically show a success message or receipt here
    };

    const value = {
        cartItems,
        selectedProduct,
        isProductPanelOpen,
        isChargePanelOpen,
        selectedCustomer,
        paymentMethod,
        amountPaid,
        changeAmount,

        openProductPanel,
        closeProductPanel,
        openChargePanel,
        closeChargePanel,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        selectCustomer,
        setPaymentMethod,
        setAmountPaid,
        getCartTotal,
        getChangeAmount,
        processPayment,
    };

    return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
}

export function usePosContext() {
    const context = useContext(PosContext);
    if (!context) {
        throw new Error("usePosContext must be used within a PosProvider");
    }
    return context;
}
