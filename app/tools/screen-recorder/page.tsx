"use client";

import { useState, useRef } from "react";
import { Circle, StopCircle, Download, Monitor } from "lucide-react";
import Link from "next/link";

export default function ScreenRecorder() {
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
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>

                    <div className="glass-card" style={{ padding: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                        <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb923c' }}>
                            <Monitor size={40} />
                        </div>

                        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                            {isRecording ? "Recording your screen..." : "Free Online Screen Recorder"}
                        </h2>

                        {!isRecording && !videoUrl && (
                            <p style={{ color: '#9ca3af', maxWidth: 400 }}>
                                Capture your screen, app window, or browser tab. No watermark, no time limit.
                            </p>
                        )}

                        {!isRecording && (
                            <button onClick={startRecording} className="btn-primary" style={{ padding: '16px 32px', fontSize: 18 }}>
                                <Circle size={20} style={{ marginRight: 10, fill: 'currentColor' }} /> Start Recording
                            </button>
                        )}

                        {isRecording && (
                            <button onClick={stopRecording} className="btn-secondary" style={{ padding: '16px 32px', fontSize: 18, background: '#ef4444', border: 'none', color: 'white' }}>
                                <StopCircle size={20} style={{ marginRight: 10, fill: 'currentColor' }} /> Stop Recording
                            </button>
                        )}

                        {videoUrl && (
                            <div style={{ width: '100%', marginTop: 20 }}>
                                <video src={videoUrl} controls style={{ width: '100%', borderRadius: 12, background: 'black', marginBottom: 20 }} />
                                <a href={videoUrl} download={`screen-record-${new Date().getTime()}.webm`} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <Download size={18} style={{ marginRight: 8 }} /> Download Recording
                                </a>
                            </div>
                        )}
                    </div>

                    <p style={{ marginTop: 24, color: '#6b7280', fontSize: 13 }}>Works best in Chrome, Edge, and Firefox on Desktop.</p>

                </div>
            </div>
        </div>
    );
}
