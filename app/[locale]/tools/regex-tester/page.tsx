import { Metadata } from 'next';
import RegexTesterClient from "./Client";

export const metadata: Metadata = {
    title: 'Regex Tester | DailyDevTools',
    description: 'Test and debug Real-time JavaScript Regular Expressions (Regex).',
};

export default function RegexTesterPage() {
    return <RegexTesterClient />;
}
