import { Metadata } from 'next';
import CssCursorClient from "./Client";

export const metadata: Metadata = {
    title: 'CSS Cursor Tester | DailyDevTools',
    description: 'Test all available CSS values for the cursor property. Helper for UI design.',
};

export default function CssCursorPage() {
    return <CssCursorClient />;
}
