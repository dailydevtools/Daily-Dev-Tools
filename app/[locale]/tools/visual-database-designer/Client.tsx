"use client";

import { ReactFlowProvider } from '@xyflow/react';
import DesignerCanvas from './components/DesignerCanvas';
import Sidebar from './components/Sidebar';

export default function VisualDatabaseDesignerClient() {
    return (
        <div suppressHydrationWarning className="h-[calc(100vh-64px)] w-full flex overflow-hidden">
            <ReactFlowProvider>
                <div className="flex-1 h-full relative">
                    <DesignerCanvas />
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
}
