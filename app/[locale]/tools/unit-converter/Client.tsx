"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import LiquidTabs from "../../../components/ui/LiquidTabs";
import { LiquidCard } from "../../../components/ui/LiquidCard";

type Category = 'length' | 'weight' | 'temperature';

export default function UnitConverterClient() {
    const t = useTranslations('UnitConverter');

    // Define units inside component or useMemo to access translations
    const UNITS: Record<Category, { id: string; name: string; factor?: number; offset?: number }[]> = {
        length: [
            { id: 'm', name: t('meters'), factor: 1 },
            { id: 'km', name: t('kilometers'), factor: 1000 },
            { id: 'cm', name: t('centimeters'), factor: 0.01 },
            { id: 'mm', name: t('millimeters'), factor: 0.001 },
            { id: 'in', name: t('inches'), factor: 0.0254 },
            { id: 'ft', name: t('feet'), factor: 0.3048 },
            { id: 'yd', name: t('yards'), factor: 0.9144 },
            { id: 'mi', name: t('miles'), factor: 1609.34 }
        ],
        weight: [
            { id: 'kg', name: t('kilograms'), factor: 1 },
            { id: 'g', name: t('grams'), factor: 0.001 },
            { id: 'lb', name: t('pounds'), factor: 0.453592 },
            { id: 'oz', name: t('ounces'), factor: 0.0283495 }
        ],
        temperature: [
            { id: 'c', name: t('celsius') },
            { id: 'f', name: t('fahrenheit') },
            { id: 'k', name: t('kelvin') }
        ]
    };

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
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Unit Converter"
                        description="Convert between different units of measurement universally."
                        icon={<ToolIcon name="Scale" size={32} />}
                    />

                    {/* Category Tabs */}
                    <div className="mb-8">
                        <LiquidTabs
                            tabs={Object.keys(UNITS) as Category[]}
                            activeTab={category}
                            onChange={(tab) => setCategory(tab)}
                            labels={{
                                length: t('length'),
                                weight: t('weight'),
                                temperature: t('temperature')
                            }}
                        />
                    </div>

                    <LiquidCard className="p-10">
                        <div className="flex flex-col gap-8">

                            {/* From */}
                            <div className="relative z-20 flex flex-col md:flex-row gap-4">
                                <LiquidInput
                                    type="number"
                                    value={value}
                                    onChange={(e) => setValue(Number(e.target.value))}
                                    className="flex-1 text-2xl font-bold"
                                />
                                <LiquidSelect
                                    value={fromUnit}
                                    onChange={setFromUnit}
                                    options={UNITS[category].map(u => ({ value: u.id, label: u.name }))}
                                    className="min-w-[160px]"
                                />
                            </div>

                            <div className="flex justify-center text-[#fb923c]">
                                <ArrowRightLeft size={24} />
                            </div>

                            {/* To */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <LiquidInput
                                    readOnly
                                    value={result}
                                    className="flex-1 text-2xl font-bold text-[#fb923c]"
                                />
                                <LiquidSelect
                                    value={toUnit}
                                    onChange={setToUnit}
                                    options={UNITS[category].map(u => ({ value: u.id, label: u.name }))}
                                    className="min-w-[160px]"
                                />
                            </div>

                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
