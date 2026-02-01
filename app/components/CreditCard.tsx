"use client";

import Link from "next/link";
import { useState } from "react";
import { Github, Linkedin, Lightbulb, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

interface CreditCardProps {
    name: string;
    username?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    avatar?: string;
    appName?: string;
    appUrl?: string;
}

export default function CreditCard({ name, username, github, linkedin, twitter, avatar, appName, appUrl }: CreditCardProps) {
    const t = useTranslations("Credit");
    const [imgError, setImgError] = useState(false);

    // If no avatar is provided but we have a GitHub link, try to use the GitHub avatar
    const displayAvatar = avatar || (github ? `${github}.png` : null);

    // Get initials from name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="w-full max-w-[600px] mx-auto mt-12 mb-6">
            <div className="relative overflow-hidden rounded-2xl bg-neutral-50/50 dark:bg-white/5 border border-[var(--border-color)] p-6 transition-all hover:border-orange-500/20">

                {/* Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Lightbulb size={40} className="text-orange-500" />
                </div>

                <div className="flex items-start gap-4 relaltive z-10">
                    {/* Avatar or Icon */}
                    <div className="shrink-0">
                        {displayAvatar && !imgError ? (
                            <img
                                src={displayAvatar}
                                alt={name}
                                onError={() => setImgError(true)}
                                className="w-10 h-10 rounded-full object-cover border border-[var(--border-color)]"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-sm border border-orange-200 dark:border-orange-900/30">
                                {getInitials(name)}
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h4 className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-[var(--muted-text)] mb-2">
                            {t("title")}
                        </h4>

                        <p className="text-[var(--foreground)] text-sm mb-3 leading-relaxed">
                            {appName ? t("inspiredByApp") : t("inspiredBy")}{" "}
                            <span className="font-medium text-orange-600 dark:text-orange-400">
                                {name}
                            </span>
                            {username && <span className="text-[var(--muted-text)] ml-1">(@{username})</span>}
                            {appName && appUrl ? (
                                <>
                                    . {t("checkOut")}{" "}
                                    <a href={appUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-orange-500 decoration-orange-500/30">
                                        {appName}
                                    </a>.
                                </>
                            ) : "."}
                            <br />
                            {t("thanks")}
                        </p>

                        <div className="flex gap-3">
                            {github && (
                                <Link
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    <Github size={18} />
                                </Link>
                            )}
                            {linkedin && (
                                <Link
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--muted-text)] hover:text-[#0077b5] transition-colors"
                                >
                                    <Linkedin size={18} />
                                </Link>
                            )}
                            {twitter && (
                                <Link
                                    href={twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--muted-text)] hover:text-[#1DA1F2] transition-colors"
                                >
                                    <Twitter size={18} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
