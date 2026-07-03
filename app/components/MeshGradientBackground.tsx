"use client";

export default function MeshGradientBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base overlay — very light to let blobs show through */}
            <div className="absolute inset-0 z-10 bg-[var(--background)] opacity-[0.25] backdrop-blur-[120px]" />

            {/* ── Aurora Blobs ─────────────────────────── */}
            {/* Blob 1: Orange top-left — biggest energy source */}
            <div
                className="animate-aurora-1 absolute top-[-15%] left-[-12%] w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(249,115,22,0.38) 0%, rgba(251,146,60,0.18) 40%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Blob 2: Amber/Yellow top-right */}
            <div
                className="animate-aurora-2 absolute top-[-8%] right-[-14%] w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(250,204,21,0.28) 0%, rgba(234,179,8,0.12) 45%, transparent 70%)",
                    filter: "blur(90px)",
                }}
            />

            {/* Blob 3: Purple mid-center */}
            <div
                className="animate-aurora-3 absolute top-[25%] left-[25%] w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.08) 50%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Blob 4: Pink/Rose bottom-right */}
            <div
                className="animate-aurora-4 absolute bottom-[-10%] right-[5%] w-[550px] h-[550px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.07) 50%, transparent 70%)",
                    filter: "blur(85px)",
                }}
            />

            {/* Blob 5: Teal bottom-left accent */}
            <div
                className="animate-aurora-1 absolute bottom-[5%] left-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(13,148,136,0.06) 50%, transparent 70%)",
                    filter: "blur(70px)",
                    animationDelay: "3s",
                }}
            />

            {/* ── Dot grid pattern ─────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                    maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
                }}
            />

            {/* Fade-out at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--background)] to-transparent z-[6]" />
        </div>
    );
}
