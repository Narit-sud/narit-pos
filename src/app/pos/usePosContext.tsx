"use client";
import { ProductInterface } from "@/model/product.interface";
import { CustomerInterface } from "@/model/customer.interface";
import { createContext, useContext, useState, ReactNode } from "react";
import { CartItemInterface } from "@/model/cartItem.interface";
import { SaleInterface } from "@/model/sale.interface";
import { createSaleService } from "@/app/pos/service";

type PaymentMethod = "cash" | "transfer";

type PosContextType = {
    cartItems: CartItemInterface[];
    selectedProduct: ProductInterface | null;
    isProductPanelOpen: boolean;
    isChargePanelOpen: boolean;
    selectedCustomer: string | null;
    paymentMethod: PaymentMethod;
    amountPaid: number;
    changeAmount: number;
    orderComment: string;

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
    setOrderComment: (comment: string) => void;
    getCartTotal: () => number;
    getChangeAmount: () => number;
    processPayment: () => Promise<void>;
};

const PosContext = createContext<PosContextType | undefined>(undefined);

type PosProviderProps = {
    children: ReactNode;
};

export function PosProvider({ children }: PosProviderProps) {
    // Cart state
    const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);

    // Product selection state
    const [selectedProduct, setSelectedProduct] =
        useState<ProductInterface | null>(null);
    const [isProductPanelOpen, setIsProductPanelOpen] = useState(false);

    // Charge panel state
    const [isChargePanelOpen, setIsChargePanelOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(
        null
    ); // customer ID
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [amountPaid, setAmountPaid] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);
    const [orderComment, setOrderComment] = useState("");

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
                quantity: Number(existingItem.quantity) + Number(item.quantity),
                totalPrice:
                    Number(existingItem.quantity + item.quantity) *
                    Number(item.unitPrice),
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
        setSelectedCustomer(customer.id);
    };

    const getCartTotal = () => {
        return cartItems.reduce(
            (total, item) => Number(total) + Number(item.totalPrice),
            0
        );
    };

    const getChangeAmount = () => {
        return amountPaid - getCartTotal();
    };

    // Process payment and create order
    const processPayment = async () => {
        // This would typically connect to your API to process the payment
        // and create an order record in your database
        const newSale: SaleInterface = {
            items: cartItems,
            customerId: selectedCustomer,
            paymentMethod,
            detail: orderComment,
            total: getCartTotal(),
        };
        console.log("Processing payment:", {
            cartItems,
            customer: selectedCustomer,
            paymentMethod,
            amountPaid,
            changeAmount: getChangeAmount(),
            total: getCartTotal(),
            comment: orderComment,
        });
        try {
            await createSaleService(newSale);
            alert("Payment processed successfully");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }

        // Reset the POS for a new transaction
        clearCart();
        closeChargePanel();
        setAmountPaid(0);
        setPaymentMethod("cash");
        setOrderComment("");

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
        orderComment,

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
        setOrderComment,
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
