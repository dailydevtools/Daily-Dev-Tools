import { Metadata } from 'next';
import CaseConverterClient from "./Client";

export const metadata: Metadata = {
    title: 'Case Converter | DailyDevTools',
    description: 'Convert text between camelCase, snake_case, PascalCase, kebab-case and more.',
};

export default function CaseConverterPage() {
    return <CaseConverterClient />;
}
