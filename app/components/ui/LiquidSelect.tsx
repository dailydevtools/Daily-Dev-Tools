"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface LiquidSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: (SelectOption | string)[];
    placeholder?: string;
    className?: string;
    title?: string; // Label for accessibility/visual
    disabled?: boolean;
}

const LiquidSelect = memo(function LiquidSelect({
    value,
    onChange,
    options,
    placeholder = "Select...",
    className = "",
    title,
    disabled = false
}: LiquidSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Normalize options
    const normalizedOptions: SelectOption[] = options.map(opt =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
    );

    const selectedOption = normalizedOptions.find(opt => opt.value === value);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleSelect = useCallback((newValue: string) => {
        onChange(newValue);
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
    }, [onChange]);

    // Keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (disabled) return;

        if (!isOpen) {
            if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                event.preventDefault();
                setIsOpen(true);
                // Find index of current selected
                const idx = normalizedOptions.findIndex(o => o.value === value);
                setFocusedIndex(idx >= 0 ? idx : 0);
            }
            return;
        }

        switch (event.key) {
            case "Escape":
                event.preventDefault();
                setIsOpen(false);
                triggerRef.current?.focus();
                break;
            case "ArrowDown":
                event.preventDefault();
                setFocusedIndex(prev => (prev < normalizedOptions.length - 1 ? prev + 1 : 0));
                break;
            case "ArrowUp":
                event.preventDefault();
                setFocusedIndex(prev => (prev > 0 ? prev - 1 : normalizedOptions.length - 1));
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                if (focusedIndex >= 0) {
                    handleSelect(normalizedOptions[focusedIndex].value);
                }
                break;
            case "Home":
                event.preventDefault();
                setFocusedIndex(0);
                break;
            case "End":
                event.preventDefault();
                setFocusedIndex(normalizedOptions.length - 1);
                break;
        }
    };

    // Scroll focused item into view
    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && listRef.current) {
            const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
            if (focusedElement) {
                focusedElement.scrollIntoView({ block: "nearest" });
            }
        }
    }, [focusedIndex, isOpen]);

    return (
        <div
            ref={dropdownRef}
            className={`relative ${className}`}
            onKeyDown={handleKeyDown}
        >
            {/* Label/Title - Optional */}
            {title && (
                <span className="text-xs text-[var(--muted-text)] font-medium uppercase tracking-wider mb-1.5 block">
                    {title}
                </span>
            )}

            <button
                ref={triggerRef}
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={`
                    flex items-center justify-between gap-2 w-full px-3 py-2 rounded-lg
                    text-sm font-medium transition-all duration-200
                    bg-[var(--card-bg)] border border-[var(--card-border)]
                    text-[var(--foreground)] outline-none
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#fb923c] focus-visible:ring-2 focus-visible:ring-orange-500/50'}
                    ${isOpen ? 'border-[#fb923c] ring-2 ring-orange-500/20' : ''}
                `}
            >
                <div className="flex items-center gap-2 truncate">
                    {selectedOption?.icon}
                    <span className="truncate">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-[var(--muted-text)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && !disabled && (
                <div
                    className="absolute z-[1000] top-full left-0 w-full mt-1 min-w-[180px]
                        bg-[var(--background)] border border-[var(--card-border)] rounded-lg
                        shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden
                        animate-[fadeIn_150ms_ease-out]
                    "
                >
                    <div ref={listRef} className="max-h-[250px] overflow-y-auto py-1">
                        {normalizedOptions.map((option, index) => (
                            <div
                                key={`${option.value}-${index}`}
                                role="option"
                                aria-selected={option.value === value}
                                onClick={() => handleSelect(option.value)}
                                onMouseEnter={() => setFocusedIndex(index)}
                                className={`
                                    flex items-center justify-between px-3 py-2 cursor-pointer transition-colors duration-150
                                    text-sm
                                    ${index === focusedIndex ? 'bg-[var(--card-hover-bg)]' : ''}
                                    ${option.value === value ? 'text-[#f97316]' : 'text-[var(--foreground)] hover:text-[#f97316]'}
                                `}
                            >
                                <div className="flex items-center gap-2 truncate">
                                    {option.icon}
                                    <span className="truncate">{option.label}</span>
                                </div>
                                {option.value === value && (
                                    <Check size={14} className="text-[#f97316] shrink-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default LiquidSelect;
