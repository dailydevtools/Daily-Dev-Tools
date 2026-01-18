"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";

type Category = 'length' | 'weight' | 'temperature';

const UNITS: Record<Category, { id: string; name: string; factor?: number; offset?: number }[]> = {
    length: [
        { id: 'm', name: 'Meters', factor: 1 },
        { id: 'km', name: 'Kilometers', factor: 1000 },
        { id: 'cm', name: 'Centimeters', factor: 0.01 },
        { id: 'mm', name: 'Millimeters', factor: 0.001 },
        { id: 'in', name: 'Inches', factor: 0.0254 },
        { id: 'ft', name: 'Feet', factor: 0.3048 },
        { id: 'yd', name: 'Yards', factor: 0.9144 },
        { id: 'mi', name: 'Miles', factor: 1609.34 }
    ],
    weight: [
        { id: 'kg', name: 'Kilograms', factor: 1 },
        { id: 'g', name: 'Grams', factor: 0.001 },
        { id: 'lb', name: 'Pounds', factor: 0.453592 },
        { id: 'oz', name: 'Ounces', factor: 0.0283495 }
    ],
    temperature: [
        { id: 'c', name: 'Celsius' },
        { id: 'f', name: 'Fahrenheit' },
        { id: 'k', name: 'Kelvin' }
    ]
};

export default function UnitConverter() {
    const [category, setCategory] = useState<Category>('length');
    const [fromUnit, setFromUnit] = useState(UNITS.length[0].id);
    const [toUnit, setToUnit] = useState(UNITS.length[5].id); // ft
    const [value, setValue] = useState(1);
    const [result, setResult] = useState<number | string>(0);

    // Update units when category changes
    useEffect(() => {
        setFromUnit(UNITS[category][0].id);
        setToUnit(UNITS[category][1].id);
    }, [category]);

    useEffect(() => {
        const convert = () => {
            const val = Number(value);
            if (isNaN(val)) { setResult('-'); return; }

            if (category === 'temperature') {
                let celsius = val;
                if (fromUnit === 'f') celsius = (val - 32) * 5 / 9;
                if (fromUnit === 'k') celsius = val - 273.15;

                let res = celsius;
                if (toUnit === 'f') res = (celsius * 9 / 5) + 32;
                if (toUnit === 'k') res = celsius + 273.15;

                setResult(res.toFixed(2));
            } else {
                // Factor based
                const fromFactor = UNITS[category].find(u => u.id === fromUnit)?.factor || 1;
                const toFactor = UNITS[category].find(u => u.id === toUnit)?.factor || 1;
                const base = val * fromFactor;
                const res = base / toFactor;
                setResult(Number(res.toPrecision(6))); // Avoid 0.000000001 issues
            }
        };
        convert();
    }, [value, fromUnit, toUnit, category]);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    {/* Category Tabs */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
                        {(Object.keys(UNITS) as Category[]).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={category === cat ? 'btn-primary' : 'btn-secondary'}
                                style={{ textTransform: 'capitalize' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                            {/* From */}
                            <div style={{ display: 'flex', gap: 16 }}>
                                <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} style={{ flex: 1, padding: 16, fontSize: 24, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 'bold' }} />
                                <select
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    style={{ width: 150, padding: '0 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16, cursor: 'pointer' }}
                                >
                                    {UNITS[category].map(u => <option key={u.id} value={u.id} style={{ color: 'black' }}>{u.name}</option>)}
                                </select>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', color: '#fb923c' }}>
                                <ArrowRightLeft size={24} />
                            </div>

                            {/* To */}
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1, padding: 16, fontSize: 24, borderRadius: 12, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', color: '#fb923c', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                    {result}
                                </div>
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    style={{ width: 150, padding: '0 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16, cursor: 'pointer' }}
                                >
                                    {UNITS[category].map(u => <option key={u.id} value={u.id} style={{ color: 'black' }}>{u.name}</option>)}
                                </select>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
