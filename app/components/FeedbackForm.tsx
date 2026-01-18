"use client";

import { useState } from "react";
import { Send, CheckCircle, MessageSquare } from "lucide-react";

export default function FeedbackForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            await fetch("https://formsubmit.co/ajax/officialsohanpaliyal+quickdevtools@gmail.com", {
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
                className="feedback-trigger"
                title="Send Feedback"
            >
                <MessageSquare size={20} />
                <span>Feedback</span>
            </button>
        );
    }

    return (
        <div className="feedback-modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--title-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <MessageSquare size={20} style={{ color: '#fb923c' }} />
                        Send Feedback
                    </h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--muted-text)', cursor: 'pointer', fontSize: 20 }}
                    >
                        ×
                    </button>
                </div>

                {isSubmitted ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <CheckCircle size={48} style={{ color: '#22c55e', marginBottom: 16 }} />
                        <h4 style={{ color: 'var(--title-color)', marginBottom: 8 }}>Thank you!</h4>
                        <p style={{ color: 'var(--muted-text)', fontSize: 14 }}>Your feedback has been sent successfully.</p>
                        <button
                            onClick={() => { setIsSubmitted(false); setIsOpen(false); }}
                            className="btn-primary"
                            style={{ marginTop: 20 }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* FormSubmit.co configuration */}
                        <input type="hidden" name="_subject" value="New Feedback from QuickDevTools" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_template" value="table" />

                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--muted-text)' }}>
                                Name (optional)
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                className="feedback-input"
                            />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--muted-text)' }}>
                                Email (optional)
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="feedback-input"
                            />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--muted-text)' }}>
                                Feedback Type
                            </label>
                            <select name="type" className="feedback-input" required>
                                <option value="suggestion">💡 Suggestion</option>
                                <option value="bug">🐛 Bug Report</option>
                                <option value="feature">✨ Feature Request</option>
                                <option value="other">📝 Other</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: 'var(--muted-text)' }}>
                                Message *
                            </label>
                            <textarea
                                name="message"
                                placeholder="Tell us what you think..."
                                className="feedback-input"
                                rows={4}
                                required
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSubmitting}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                        >
                            {isSubmitting ? (
                                "Sending..."
                            ) : (
                                <>
                                    <Send size={16} />
                                    Send Feedback
                                </>
                            )}
                        </button>

                        <p style={{ fontSize: 11, color: 'var(--muted-text)', marginTop: 12, textAlign: 'center' }}>
                            We read every message. Thank you for helping us improve!
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
