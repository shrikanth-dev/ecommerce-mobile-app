export const calculateDiscountPercentage = (
    originalPrice: number,
    sellingPrice: number,
): number => {
    if (originalPrice <= 0 || sellingPrice < 0 || sellingPrice >= originalPrice) {
        return 0;
    }

    return Math.round(
        ((originalPrice - sellingPrice) / originalPrice) * 100,
    );
};

export const calculateTotal = (prices: number[]): number => {
    return prices.reduce((total, price) => total + price, 0);
};

export const calculateItemTotal = (
    price: number,
    quantity: number,
): number => {
    return price * quantity;
};