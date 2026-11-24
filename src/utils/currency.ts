import { APP_CONFIG } from "@/constants";

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(APP_CONFIG.currency.locale, {
        style: "currency",
        currency: APP_CONFIG.currency.code,
        maximumFractionDigits: 2,
    }).format(amount);
};