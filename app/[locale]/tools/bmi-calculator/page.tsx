import { Metadata } from 'next';
import BMICalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'BMI Calculator | DailyDevTools',
    description: 'Calculate your Body Mass Index (BMI). Supports metric and imperial units with health status categories.',
};

export default function BMICalculatorPage() {
    return <BMICalculatorClient />;
}
