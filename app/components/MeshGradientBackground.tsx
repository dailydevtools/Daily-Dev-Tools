"use client";

import { useEffect, useRef } from "react";

export default function MeshGradientBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[var(--background)] opacity-40 z-10 backdrop-blur-[100px]" />

            {/* Mesh Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-mesh-blob" />
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-mesh-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-500/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-mesh-blob animation-delay-4000" />
            <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-mesh-blob" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        </div>
    );
}
