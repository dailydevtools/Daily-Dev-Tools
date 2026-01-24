import { Metadata } from 'next';
import FuelCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Fuel Cost Calculator | DailyDevTools',
    description: 'Calculate trip fuel costs instantly. Enter distance, fuel efficiency (MPG), and gas price.',
};

export default function FuelCalculatorPage() {
    return <FuelCalculatorClient />;
}
