import { Metadata } from 'next';
import CssTriangleClient from "./Client";

export const metadata: Metadata = {
    title: 'CSS Triangle Generator | DailyDevTools',
    description: 'Create CSS triangles easily. Adjust direction, size, and color.',
};

export default function CssTrianglePage() {
    return <CssTriangleClient />;
}
