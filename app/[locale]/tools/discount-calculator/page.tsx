import { Metadata } from 'next';
import DiscountCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Discount Calculator | DailyDevTools',
    description: 'Calculate final price after discount and sales tax. Estimate savings for sales events.',
};

export default function DiscountCalculatorPage() {
    return <DiscountCalculatorClient />;
}
