import { useEffect, useState } from 'react';
import { History, Clock, ArrowRight } from 'lucide-react';
import { RequestHistoryItem } from '../../../../lib/apiDocsTypes';
import { getRequestHistory } from '../../../../lib/apiDocsStorage';
import { formatDistanceToNow } from 'date-fns';

interface Props {
    endpointId: string;
    onSelect: (item: RequestHistoryItem) => void;
    refreshTrigger: number; // Increment to force refresh
}

export default function RequestHistory({ endpointId, onSelect, refreshTrigger }: Props) {
    const [history, setHistory] = useState<RequestHistoryItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadHistory();
    }, [endpointId, refreshTrigger]);

    const loadHistory = async () => {
        setLoading(true);
        try {
            const data = await getRequestHistory(endpointId);
            setHistory(data);
        } catch (error) {
            console.error('Failed to load history', error);
        } finally {
            setLoading(false);
        }
    };

    if (history.length === 0 && !loading) return null;

    return (
        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <History className="w-4 h-4 text-[var(--muted-text)]" />
                History
            </h3>

            <div className="space-y-2">
                {history.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="w-full text-left bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-purple-500/30 rounded-lg p-2.5 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${item.status >= 200 && item.status < 300
                                        ? 'border-green-500/20 bg-green-500/10 text-green-500'
                                        : 'border-red-500/20 bg-red-500/10 text-red-500'
                                    }`}>
                                    {item.status}
                                </span>
                                <span className="text-xs text-[var(--muted-text)] font-mono">
                                    {item.durationMs.toFixed(0)}ms
                                </span>
                            </div>
                            <span className="text-[10px] text-[var(--muted-text)] flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <code className="text-xs text-[var(--text-color)] truncate max-w-[80%]">
                                {item.url}
                            </code>
                            <ArrowRight className="w-3 h-3 text-[var(--muted-text)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
