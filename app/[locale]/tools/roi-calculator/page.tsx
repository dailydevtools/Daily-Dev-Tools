import { Metadata } from 'next';
import RoiCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'ROI Calculator | DailyDevTools',
    description: 'Calculate Return on Investment (ROI) and Annualized ROI easily.',
};

export default function RoiCalculatorPage() {
    return <RoiCalculatorClient />;
}
