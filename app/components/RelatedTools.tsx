"use client";

import { usePathname } from "next/navigation";
import { tools } from "../data/tools";
import Link from "next/link";
import ToolIcon from "./ToolIcon";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function RelatedTools() {
    const pathname = usePathname();
    const [randomTools, setRandomTools] = useState<typeof tools>([]);

    useEffect(() => {
        const currentId = pathname?.split('/').pop();
        const others = tools.filter(t => t.id !== currentId);
        // Fisher-Yates shuffle would be better, but simple sort is enough for small list
        const shuffled = [...others].sort(() => 0.5 - Math.random());
        setRandomTools(shuffled.slice(0, 3));
    }, [pathname]);

    if (randomTools.length === 0) return null;

    return (
        <div style={{ marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 40, paddingBottom: 40 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h3 style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>You might also like</h3>
                <p style={{ color: '#9ca3af' }}>Explore other popular developer tools</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {randomTools.map(tool => (
                    <Link key={tool.id} href={`/tools/${tool.id}`} className="glass-card" style={{ padding: 24, display: 'block', textDecoration: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                            <div style={{ color: '#fb923c' }}>
                                <ToolIcon name={tool.icon} size={24} />
                            </div>
                            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>{tool.name}</h4>
                        </div>
                        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16, lineHeight: 1.5 }}>{tool.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#fb923c', fontSize: 13, fontWeight: 500 }}>
                            <span>Open Tool</span>
                            <ArrowRight size={14} style={{ marginLeft: 6 }} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
