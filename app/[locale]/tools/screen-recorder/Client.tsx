"use client";

import { useState, useRef } from "react";
import { Circle, StopCircle, Download, Monitor } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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

    const downloadVideo = () => {
        const a = document.createElement('a');
        a.href = videoUrl;
        a.download = `screen-record-${new Date().getTime()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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

                    <LiquidCard className="p-14 flex flex-col items-center gap-8">
                        <div className="w-20 h-20 rounded-3xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-orange-500">
                            <Monitor size={40} />
                        </div>

                        <h2 className="text-2xl font-bold text-[var(--foreground)]">
                            {isRecording ? t('titleRecording') : t('titleFree')}
                        </h2>

                        {!isRecording && !videoUrl && (
                            <p className="text-[var(--muted-text)] max-w-[400px]">
                                {t('desc')}
                            </p>
                        )}

                        {!isRecording && (
                            <LiquidButton onClick={startRecording} className="py-4 px-8 text-lg">
                                <Circle size={20} className="mr-2.5 fill-current" /> {t('start')}
                            </LiquidButton>
                        )}

                        {isRecording && (
                            <LiquidButton onClick={stopRecording} variant="ghost" className="py-4 px-8 text-lg text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20">
                                <StopCircle size={20} className="mr-2.5 fill-current" /> {t('stop')}
                            </LiquidButton>
                        )}

                        {videoUrl && (
                            <div className="w-full mt-5">
                                <video src={videoUrl} controls className="w-full rounded-xl bg-black mb-5" />
                                <LiquidButton onClick={downloadVideo} className="inline-flex items-center h-11 px-6 text-base">
                                    <Download size={18} className="mr-2" /> {t('download')}
                                </LiquidButton>
                            </div>
                        )}
                    </LiquidCard>

                    <p className="mt-6 text-[var(--muted-text)] text-[13px]">{t('browserSupport')}</p>

                </div>
            </div>
        </main>
    );
}
