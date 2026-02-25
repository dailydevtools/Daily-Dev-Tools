"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Braces, Box } from 'lucide-react';

interface JsonTreeProps {
    data: any;
    level?: number;
    name?: string;
    isLast?: boolean;
}

const getType = (value: any) => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
};

export default function JsonTree({ data, level = 0, name, isLast = true }: JsonTreeProps) {
    const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels
    const type = getType(data);
    const isObject = type === 'object' || type === 'array';
    const isEmpty = isObject && Object.keys(data).length === 0;

    const toggle = () => setIsExpanded(!isExpanded);

    const renderValue = (val: any) => {
        const valType = getType(val);
        switch (valType) {
            case 'string': return <span className="text-green-600 dark:text-green-400">"{val}"</span>;
            case 'number': return <span className="text-orange-600 dark:text-orange-400">{val}</span>;
            case 'boolean': return <span className="text-blue-600 dark:text-blue-400 font-bold">{String(val)}</span>;
            case 'null': return <span className="text-neutral-500 italic">null</span>;
            default: return String(val);
        }
    };

    if (!isObject) {
        return (
            <div className="font-mono text-sm pl-4 flex items-start leading-6 hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 transition-colors">
                {name && <span className="text-neutral-500 dark:text-neutral-400 mr-2 opacity-75">{name}:</span>}
                {renderValue(data)}
                {!isLast && <span className="text-neutral-400">,</span>}
            </div>
        );
    }

    const keys = Object.keys(data);

    return (
        <div className="font-mono text-sm select-text">
            <div
                className={`flex items-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 transition-colors ${level > 0 ? 'pl-4' : ''}`}
                onClick={toggle}
            >
                {isEmpty ? (
                    <div className="w-4" />
                ) : (
                    <div className="w-4 flex items-center justify-center mr-1 text-neutral-400">
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                )}

                {name && <span className="text-purple-600 dark:text-purple-400 mr-2 font-medium">{name}:</span>}

                <span className="text-neutral-600 dark:text-neutral-300">
                    {type === 'array' ? '[' : '{'}
                    {!isExpanded && !isEmpty && (
                        <span className="text-neutral-400 italic mx-1 text-xs">
                            {keys.length} {keys.length === 1 ? 'item' : 'items'} ...
                        </span>
                    )}
                </span>

                {(!isExpanded || isEmpty) && (
                    <span className="text-neutral-600 dark:text-neutral-300">
                        {type === 'array' ? ']' : '}'}
                        {!isLast && <span className="text-neutral-400">,</span>}
                    </span>
                )}
            </div>

            {isExpanded && !isEmpty && (
                <div>
                    {keys.map((key, index) => (
                        <JsonTree
                            key={key}
                            name={type === 'array' ? undefined : key}
                            data={data[key]}
                            level={level + 1}
                            isLast={index === keys.length - 1}
                        />
                    ))}
                    <div className={`pl-4 ${level > 0 ? 'pl-8' : ''} text-neutral-600 dark:text-neutral-300`}>
                        {type === 'array' ? ']' : '}'}
                        {!isLast && <span className="text-neutral-400">,</span>}
                    </div>
                </div>
            )}
        </div>
    );
}
