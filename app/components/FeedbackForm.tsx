"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeedbackForm() {
    const t = useTranslations('FeedbackForm');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-feedback-modal", handleOpen);
        return () => window.removeEventListener("open-feedback-modal", handleOpen);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            await fetch("https://formsubmit.co/ajax/officialsohanpaliyal+dailydevtools@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });
            setIsSubmitted(true);
            form.reset();
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed z-50 flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full text-[var(--title-color)] font-medium cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-[var(--card-hover-bg)] hover:border-[#fb923c] hover:-translate-y-0.5 bottom-20 left-4 p-2.5 text-[13px] md:bottom-6 md:left-6 md:px-5 md:py-3 md:text-sm"
                title={t('sendFeedback')}
            >
                <MessageSquare size={20} />
                <span className="hidden md:inline">{t('feedback')}</span>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[4px] flex items-center justify-center p-6" onClick={() => setIsOpen(false)}>
            <div className="w-full max-w-[420px] bg-[var(--background)] border border-[var(--border-color)] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-[var(--title-color)] flex items-center gap-2">
                        <MessageSquare size={20} className="text-[#fb923c]" />
                        {t('sendFeedback')}
                    </h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-transparent border-none text-[var(--muted-text)] cursor-pointer text-xl"
                    >
                        ×
                    </button>
                </div>

                {isSubmitted ? (
                    <div className="text-center py-10 px-5">
                        <CheckCircle size={48} className="text-[#22c55e] mb-4 mx-auto" />
                        <h4 className="text-[var(--title-color)] mb-2 text-base font-semibold">{t('thankYou')}</h4>
                        <p className="text-[var(--muted-text)] text-sm">{t('feedbackSent')}</p>
                        <button
                            onClick={() => { setIsSubmitted(false); setIsOpen(false); }}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] mt-5"
                        >
                            {t('close')}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* FormSubmit.co configuration */}
                        <input type="hidden" name="_subject" value="New Feedback from DailyDevTools" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_template" value="table" />

                        <div className="mb-4">
                            <label className="block mb-1.5 text-[13px] text-[var(--muted-text)]">
                                {t('name')}
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder={t('namePlaceholder')}
                                className="w-full px-3.5 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-[var(--title-color)] text-sm transition-colors duration-200 focus:outline-none focus:border-[#fb923c] placeholder:text-[var(--muted-text)]"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1.5 text-[13px] text-[var(--muted-text)]">
                                {t('email')}
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder={t('emailPlaceholder')}
                                className="w-full px-3.5 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-[var(--title-color)] text-sm transition-colors duration-200 focus:outline-none focus:border-[#fb923c] placeholder:text-[var(--muted-text)]"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1.5 text-[13px] text-[var(--muted-text)]">
                                {t('feedbackType')}
                            </label>
                            <select name="type" className="w-full px-3.5 py-3 border border-[var(--border-color)] rounded-lg text-[var(--title-color)] text-sm transition-colors duration-200 focus:outline-none focus:border-[#fb923c] placeholder:text-[var(--muted-text)]" required>
                                <option className="bg-[var(--background)]" value="suggestion">{t('typeSuggestion')}</option>
                                <option className="bg-[var(--background)]" value="bug">{t('typeBug')}</option>
                                <option className="bg-[var(--background)]" value="feature">{t('typeFeature')}</option>
                                <option className="bg-[var(--background)]" value="other">{t('typeOther')}</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-1.5 text-[13px] text-[var(--muted-text)]">
                                {t('message')}
                            </label>
                            <textarea
                                name="message"
                                placeholder={t('messagePlaceholder')}
                                className="w-full px-3.5 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-[var(--title-color)] text-sm transition-colors duration-200 focus:outline-none focus:border-[#fb923c] placeholder:text-[var(--muted-text)] resize-y"
                                rows={4}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                t('sending')
                            ) : (
                                <>
                                    <Send size={16} />
                                    {t('sendFeedback')}
                                </>
                            )}
                        </button>

                        <p className="text-[11px] text-[var(--muted-text)] mt-3 text-center">
                            {t('weReadEveryMessage')}
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
