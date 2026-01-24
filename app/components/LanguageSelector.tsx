"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/routing";

// Define languages as a constant to avoid recreating on each render
const LANGUAGES = [
    { code: "ar", name: "Arabic", native: "العربية" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
    { code: "zh", name: "Chinese", native: "中文" },
    { code: "cs", name: "Czech", native: "Čeština" },
    { code: "da", name: "Danish", native: "Dansk" },
    { code: "nl", name: "Dutch", native: "Nederlands" },
    { code: "en", name: "English", native: "English" },
    { code: "fr", name: "French", native: "Français" },
    { code: "de", name: "German", native: "Deutsch" },
    { code: "el", name: "Greek", native: "Ελληνικά" },
    { code: "he", name: "Hebrew", native: "עברית" },
    { code: "hi", name: "Hindi", native: "हिन्दी" },
    { code: "hu", name: "Hungarian", native: "Magyar" },
    { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
    { code: "it", name: "Italian", native: "Italiano" },
    { code: "ja", name: "Japanese", native: "日本語" },
    { code: "ko", name: "Korean", native: "한국어" },
    { code: "ms", name: "Malay", native: "Bahasa Melayu" },
    { code: "no", name: "Norwegian", native: "Norsk" },
    { code: "pl", name: "Polish", native: "Polski" },
    { code: "pt", name: "Portuguese", native: "Português" },
    { code: "ro", name: "Romanian", native: "Română" },
    { code: "ru", name: "Russian", native: "Русский" },
    { code: "es", name: "Spanish", native: "Español" },
    { code: "sv", name: "Swedish", native: "Svenska" },
    { code: "th", name: "Thai", native: "ไทย" },
    { code: "tr", name: "Turkish", native: "Türkçe" },
    { code: "uk", name: "Ukrainian", native: "Українська" },
    { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
] as const;

interface LanguageSelectorProps {
    variant?: "desktop" | "mobile";
}

// Memoized language option item
const LanguageOption = memo(function LanguageOption({
    language,
    isSelected,
    isFocused,
    onClick,
    onMouseEnter,
}: {
    language: (typeof LANGUAGES)[number];
    isSelected: boolean;
    isFocused: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
}) {
    return (
        <button
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className={`
                w-full px-3 py-2 text-left text-sm flex items-center justify-between gap-2
                transition-colors duration-150 cursor-pointer border-none outline-none
                ${isFocused ? "bg-[var(--card-hover-bg)]" : "bg-transparent"}
                ${isSelected ? "text-[var(--orange-400)]" : "text-[var(--muted-text)]"}
                hover:bg-[var(--card-hover-bg)]
            `}
        >
            <span className="flex items-center gap-2 min-w-0">
                <span className="truncate">{language.name}</span>
                <span className="text-xs opacity-60">({language.native})</span>
            </span>
            {isSelected && <Check size={14} className="flex-shrink-0 text-[var(--orange-400)]" />}
        </button>
    );
});

function LanguageSelector({ variant = "desktop" }: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const currentLanguage = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[6]; // Default to English
    const currentIndex = LANGUAGES.findIndex((lang) => lang.code === locale);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (!isOpen) {
                if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                    event.preventDefault();
                    setIsOpen(true);
                    setFocusedIndex(currentIndex);
                }
                return;
            }

            switch (event.key) {
                case "Escape":
                    event.preventDefault();
                    setIsOpen(false);
                    setFocusedIndex(-1);
                    triggerRef.current?.focus();
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    setFocusedIndex((prev) => (prev < LANGUAGES.length - 1 ? prev + 1 : 0));
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    setFocusedIndex((prev) => (prev > 0 ? prev - 1 : LANGUAGES.length - 1));
                    break;
                case "Enter":
                case " ":
                    event.preventDefault();
                    if (focusedIndex >= 0) {
                        handleLanguageSelect(LANGUAGES[focusedIndex].code);
                    }
                    break;
                case "Home":
                    event.preventDefault();
                    setFocusedIndex(0);
                    break;
                case "End":
                    event.preventDefault();
                    setFocusedIndex(LANGUAGES.length - 1);
                    break;
            }
        },
        [isOpen, focusedIndex, currentIndex]
    );

    // Scroll focused item into view
    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && listRef.current) {
            const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
            if (focusedElement) {
                focusedElement.scrollIntoView({ block: "nearest" });
            }
        }
    }, [focusedIndex, isOpen]);

    const handleLanguageSelect = useCallback(
        (langCode: string) => {
            router.replace(pathname, { locale: langCode });
            setIsOpen(false);
            setFocusedIndex(-1);
        },
        [router, pathname]
    );

    const toggleDropdown = useCallback(() => {
        setIsOpen((prev) => !prev);
        if (!isOpen) {
            setFocusedIndex(currentIndex);
        }
    }, [isOpen, currentIndex]);

    const isMobile = variant === "mobile";

    return (
        <div ref={dropdownRef} className="relative" onKeyDown={handleKeyDown}>
            {/* Trigger Button */}
            <button
                ref={triggerRef}
                type="button"
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={`Select language, current: ${currentLanguage.name}`}
                className={`
                    flex items-center gap-1.5 bg-transparent border-none cursor-pointer outline-none
                    transition-colors duration-200 rounded-md
                    ${isMobile
                        ? "text-[var(--title-color)] text-base py-2 px-0"
                        : "text-[var(--muted-text)] text-[13px] px-1.5 py-1 hover:text-[var(--orange-400)]"
                    }
                `}
            >
                <Globe size={isMobile ? 16 : 14} />
                <span className="max-w-[100px] truncate">{currentLanguage.native}</span>
                <ChevronDown
                    size={isMobile ? 14 : 12}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    role="listbox"
                    aria-label="Select language"
                    className={`
                        absolute z-[200] bg-[var(--background)] border border-[var(--card-border)]
                        rounded-lg shadow-lg overflow-hidden
                        animate-[fadeIn_150ms_ease-out]
                        ${isMobile
                            ? "left-0 right-0 mt-2 max-h-[300px]"
                            : "right-0 mt-1 min-w-[200px] max-h-[320px]"
                        }
                    `}
                    style={{
                        animation: "fadeIn 150ms ease-out",
                    }}
                >
                    <div ref={listRef} className="overflow-y-auto max-h-[inherit]">
                        {LANGUAGES.map((language, index) => (
                            <LanguageOption
                                key={language.code}
                                language={language}
                                isSelected={language.code === locale}
                                isFocused={index === focusedIndex}
                                onClick={() => handleLanguageSelect(language.code)}
                                onMouseEnter={() => setFocusedIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(LanguageSelector);
