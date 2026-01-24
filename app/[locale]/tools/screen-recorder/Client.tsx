"use client";

import { useState, useRef } from "react";
import { Circle, StopCircle, Download, Monitor } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function ScreenRecorderClient() {
    const t = useTranslations('ScreenRecorder');
    const [isRecording, setIsRecording] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: "screen" } as any, // Type assertion for outdated TS defs
                audio: true
            });

            const mimeType = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
                ? "video/webm; codecs=vp9"
                : "video/webm";

            const recorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
                chunksRef.current = [];

                // Stop tracks to release camera/screen
                stream.getTracks().forEach(track => track.stop());
                setIsRecording(false);
            };

            recorder.start();
            setIsRecording(true);
            setVideoUrl("");

            // Handle user clicking "Stop sharing" chrome UI
            stream.getVideoTracks()[0].onended = () => {
                if (recorder.state !== 'inactive') recorder.stop();
            };

        } catch (err) {
            console.error("Error starting screen record:", err);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto text-center">

                    <ToolPageHeader
                        title="Screen Recorder"
                        description="Record your screen directly from your browser. No installation needed."
                        icon={<Monitor size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-14 flex flex-col items-center gap-8">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-[#fb923c]">
                            <Monitor size={40} />
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            {isRecording ? t('titleRecording') : t('titleFree')}
                        </h2>

                        {!isRecording && !videoUrl && (
                            <p className="text-[#9ca3af] max-w-[400px]">
                                {t('desc')}
                            </p>
                        )}

                        {!isRecording && (
                            <button onClick={startRecording} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-4 px-8 text-lg flex items-center">
                                <Circle size={20} className="mr-2.5 fill-current" /> {t('start')}
                            </button>
                        )}

                        {isRecording && (
                            <button onClick={stopRecording} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-4 px-8 text-lg bg-red-500 border-none text-white hover:bg-red-600 flex items-center">
                                <StopCircle size={20} className="mr-2.5 fill-current" /> {t('stop')}
                            </button>
                        )}

                        {videoUrl && (
                            <div className="w-full mt-5">
                                <video src={videoUrl} controls className="w-full rounded-xl bg-black mb-5" />
                                <a href={videoUrl} download={`screen-record-${new Date().getTime()}.webm`} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] inline-flex items-center">
                                    <Download size={18} className="mr-2" /> {t('download')}
                                </a>
                            </div>
                        )}
                    </div>

                    <p className="mt-6 text-[#6b7280] text-[13px]">{t('browserSupport')}</p>

                </div>
            </div>
        </main>
    );
}
