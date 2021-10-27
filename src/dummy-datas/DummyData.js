export const ORDERS = [
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "1m6w8cgm",
        totalAmount: 6.65,
        isReceived: true,
        isOutForDelivery: false,
        isOrderDelivered: false,
        isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "2k5w7ffn",
        totalAmount: 6.65,
        isReceived: false,
        isOutForDelivery: false,
        isOrderDelivered: true,
        isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "4x3w1rhj",
        totalAmount: 6.65,
        isReceived: false,
        isOutForDelivery: false,
        isOrderDelivered: true,
        isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "2c7w8cgm",
        totalAmount: 6.65,
        isReceived: true,
        isOutForDelivery: false,
        isOrderDelivered: false,
        isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "8t5w7ffn",
        totalAmount: 6.65,
        isReceived: false,
        isOutForDelivery: false,
        isOrderDelivered: true,
        isOrderCanceled: false,
    },
    {
        orderName: "Order Name",
        email: "example@gmail.com",
        store: "Store Name",
        transactionId: "9l0b1rhj",
        totalAmount: 6.65,
        isReceived: false,
        isOutForDelivery: false,
        isOrderDelivered: true,
        isOrderCanceled: false,
    },
];

export const DISCOUNTS = [
    {
        discountName: "Introductionary Offer",
        discountCodeName: "565 65656 5656",
        rewardType: "Percentage(%)",
        rewardPercentage: "45",
        rewardProducts: [],
        criteria: "First Download",
        minBill: "",
        duration: "",
        categories: [],
        products: [],
        allProductsAreMarked: true,
        discountIsActive: true,
    },
    {
        discountName: "Test",
        discountCodeName: "5464 665645 5454",
        rewardType: "Percentage(%)",
        rewardPercentage: "20",
        rewardProducts: [],
        criteria: "None",
        minBill: "",
        duration: "",
        categories: [],
        products: [],
        allProductsAreMarked: true,
        discountIsActive: true,
    },
];

export const GROUPS = [
    {
        id: Math.random().toString(),
        groupName: "Some Name",
        quantity: "3",
        rewardType: "Percentage(%)",
        rewardPercentage: "50",
        rewardProducts: [],
        totalAmount: "10",
    },
    {
        id: Math.random().toString(),
        groupName: "Other Name",
        quantity: "1",
        rewardType: "Percentage(%)",
        rewardPercentage: "15",
        rewardProducts: [],
        totalAmount: "5",
    },
];

export const TAXES = [
    {
        id: Math.random().toString(),
        taxName: "FL Sales Tax",
        percentage: 7.5,
    },
    {
        id: Math.random().toString(),
        taxName: "Test",
        percentage: 5.6,
    },
];