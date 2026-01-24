import type { Metadata } from 'next';
import { Shield, Zap, Code, Heart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About DailyDevTools - Our Mission',
    description: 'Learn about DailyDevTools and our mission to build fast, private, and free developer tools that run entirely in your browser.',
};

export default function AboutPage() {
    return (
        <div className="max-w-[800px] mx-auto py-20 px-6">
            <div className="text-center mb-15">
                <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold mb-6 text-[var(--title-color)] leading-[1.1]">
                    Tools that respect your <span className="gradient-text">Privacy</span>
                </h1>
                <p className="text-[var(--muted-text)] text-lg max-w-[600px] mx-auto leading-[1.6]">
                    DailyDevTools was built with a simple mission: proper developer tools shouldn't require a server round-trip.
                </p>
            </div>

            <div className="grid gap-10">
                <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 rounded-3xl border border-[var(--border-color)]">
                    <div className="bg-[#f973161a] text-[#fb923c] flex items-center justify-center rounded-xl border border-[#f9731633] transition-transform duration-300 hover:scale-110 w-12 h-12 mb-5 flex items-center justify-center">
                        <Shield size={24} className="text-[#fb923c]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-[var(--title-color)]">100% Client-Side</h2>
                    <p className="text-[var(--foreground)] leading-[1.7]">
                        When you paste your JSON, SQL, or identifying data into DailyDevTools, it <strong>never leaves your browser</strong>.
                        We use modern JavaScript APIs to process everything on your device. This means your data is safe, secure,
                        and never logged on our servers (because we don't even see it).
                    </p>
                </section>

                <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-[20px] border border-[var(--border-color)]">
                        <Zap size={24} className="text-[#fb923c] mb-4" />
                        <h3 className="text-lg font-semibold mb-2 text-[var(--title-color)]">Lightning Fast</h3>
                        <p className="text-[var(--muted-text)] text-sm leading-[1.6]">
                            No network latency. Results appear instantly as you type because the computation happens locally.
                        </p>
                    </div>
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 rounded-[20px] border border-[var(--border-color)]">
                        <Heart size={24} className="text-[#fb923c] mb-4" />
                        <h3 className="text-lg font-semibold mb-2 text-[var(--title-color)]">Always Free</h3>
                        <p className="text-[var(--muted-text)] text-sm leading-[1.6]">
                            We believe basic utilities should be accessible to everyone. No paywalls, no "pro" plans for basic features.
                        </p>
                    </div>
                </section>

                <section className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8 rounded-3xl border border-[var(--border-color)] text-center">
                    <h2 className="text-2xl font-bold mb-4 text-[var(--title-color)]">Open Source at Heart</h2>
                    <p className="text-[var(--foreground)] leading-[1.7] mb-6">
                        We love the developer community. If you have suggestions or want to report a bug, reach out to us.
                    </p>
                    <a href="https://github.com/sohanpaliyal" target="_blank" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] inline-flex items-center gap-2">
                        <Code size={18} />
                        View on GitHub
                    </a>
                </section>
            </div>
        </div>
    );
}
