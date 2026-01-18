"use client";

import { useState } from "react";
import { ArrowLeft, Search, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import Link from "next/link";

interface Status {
    code: number;
    title: string;
    desc: string;
    cat: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
}

const codes: Status[] = [
    { code: 100, title: "Continue", desc: "The server has received the request headers and the client should proceed to send the request body.", cat: "1xx" },
    { code: 200, title: "OK", desc: "The request succeeded. The result meaning depends on the HTTP method.", cat: "2xx" },
    { code: 201, title: "Created", desc: "The request succeeded, and a new resource was created as a result.", cat: "2xx" },
    { code: 204, title: "No Content", desc: "There is no content to send for this request, but the headers may be useful.", cat: "2xx" },
    { code: 301, title: "Moved Permanently", desc: "The URL of the requested resource has been changed permanently.", cat: "3xx" },
    { code: 302, title: "Found", desc: "The URI of requested resource has been changed temporarily.", cat: "3xx" },
    { code: 304, title: "Not Modified", desc: "Used for caching purposes. It tells the client that the response has not been modified.", cat: "3xx" },
    { code: 400, title: "Bad Request", desc: "The server cannot or will not process the request due to an apparent client error.", cat: "4xx" },
    { code: 401, title: "Unauthorized", desc: "The request requires user authentication.", cat: "4xx" },
    { code: 403, title: "Forbidden", desc: "The client does not have access rights to the content.", cat: "4xx" },
    { code: 404, title: "Not Found", desc: "The server can not find the requested resource.", cat: "4xx" },
    { code: 405, title: "Method Not Allowed", desc: "The request method is known by the server but is not supported by the target resource.", cat: "4xx" },
    { code: 429, title: "Too Many Requests", desc: "The user has sent too many requests in a given amount of time.", cat: "4xx" },
    { code: 500, title: "Internal Server Error", desc: "The server has encountered a situation it does not know how to handle.", cat: "5xx" },
    { code: 502, title: "Bad Gateway", desc: "The server received an invalid response from the upstream server.", cat: "5xx" },
    { code: 503, title: "Service Unavailable", desc: "The server is not ready to handle the request (overloaded or maintenance).", cat: "5xx" },
    { code: 504, title: "Gateway Timeout", desc: "The server did not get a response in time from the upstream server.", cat: "5xx" },
];

export default function HttpStatus() {
    const [search, setSearch] = useState("");
    const filtered = codes.filter(c => c.code.toString().includes(search) || c.title.toLowerCase().includes(search.toLowerCase()));

    const getIcon = (cat: string) => {
        if (cat === "1xx") return <Info color="#3b82f6" />;
        if (cat === "2xx") return <CheckCircle color="#22c55e" />;
        if (cat === "3xx") return <ArrowLeft color="#eab308" />;
        if (cat === "4xx") return <AlertTriangle color="#f97316" />;
        if (cat === "5xx") return <XCircle color="#ef4444" />;
        return <Info />;
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 24, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center', position: 'sticky', top: 100, zIndex: 20, backdropFilter: 'blur(10px)' }}>
                        <Search color="#9ca3af" />
                        <input
                            type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search code (e.g. 404) or name..."
                            style={{ flex: 1, background: 'transparent', border: 'none', fontSize: 16, color: 'white', outline: 'none' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {filtered.map(code => (
                            <div key={code.code} className="glass-card" style={{ padding: 24, display: 'flex', gap: 24 }}>
                                <div style={{ minWidth: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                    {getIcon(code.cat)}
                                    <div style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{code.code}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 4 }}>{code.title}</div>
                                    <div style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.5 }}>{code.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
