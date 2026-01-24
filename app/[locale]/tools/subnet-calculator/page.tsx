import { Metadata } from 'next';
import SubnetCalculatorClient from "./Client";

export const metadata: Metadata = {
    title: 'Subnet Calculator | DailyDevTools',
    description: 'Calculate IP subnet masks, network addresses, and host ranges.',
};

export default function SubnetCalculatorPage() {
    return <SubnetCalculatorClient />;
}
