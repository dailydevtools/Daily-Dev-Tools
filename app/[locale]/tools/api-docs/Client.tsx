"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, FileText, Trash2, Edit3, ChevronRight, Search, FolderOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { useConfirmDialog } from "../../../components/ui/ConfirmDialog";
import ToolIcon from "../../../components/ToolIcon";
import { APICollection, APIEndpoint } from "../../../lib/apiDocsTypes";
import {
    getAllCollections,
    saveCollection,
    deleteCollection,
    createEmptyCollection,
    generateId,
} from "../../../lib/apiDocsStorage";
import { parseCurl } from "../../../lib/curlParser";
import CollectionEditor from "./components/CollectionEditor";
import EndpointEditor from "./components/EndpointEditor";
import DocumentationView from "./components/DocumentationView";

type View = 'list' | 'collection' | 'endpoint' | 'docs';

export default function APIDocsClient() {
    const t = useTranslations('APIDocs');
    const { confirm } = useConfirmDialog();

    // State
    const [collections, setCollections] = useState<APICollection[]>([]);
    const [activeCollection, setActiveCollection] = useState<APICollection | null>(null);
    const [activeEndpoint, setActiveEndpoint] = useState<APIEndpoint | null>(null);
    const [view, setView] = useState<View>('list');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal states
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [editingCollection, setEditingCollection] = useState<APICollection | null>(null);
    const [showEndpointModal, setShowEndpointModal] = useState(false);
    const [editingEndpoint, setEditingEndpoint] = useState<APIEndpoint | null>(null);

    // Load collections on mount
    useEffect(() => {
        loadCollections();
    }, []);

    const loadCollections = async () => {
        setLoading(true);
        try {
            const data = await getAllCollections();
            setCollections(data);
        } catch (error) {
            console.error('Failed to load collections:', error);
        } finally {
            setLoading(false);
        }
    };

    // Collection CRUD
    const handleSaveCollection = async (collection: APICollection) => {
        await saveCollection(collection);
        await loadCollections();
        setShowCollectionModal(false);
        setEditingCollection(null);

        // If editing the active collection, update it
        if (activeCollection?.id === collection.id) {
            setActiveCollection(collection);
        }
    };

    const handleDeleteCollection = async (id: string) => {
        if (!await confirm({
            title: t('deleteCollection'),
            description: t('deleteCollectionConfirm'),
            variant: "danger",
            confirmText: t('delete'),
            cancelText: t('cancel')
        })) return;

        await deleteCollection(id);
        await loadCollections();
        if (activeCollection?.id === id) {
            setActiveCollection(null);
            setView('list');
        }
    };

    // Endpoint CRUD
    const handleSaveEndpoint = async (endpoint: APIEndpoint) => {
        if (!activeCollection) return;

        const updatedEndpoints = editingEndpoint
            ? activeCollection.endpoints.map(e => e.id === endpoint.id ? endpoint : e)
            : [...activeCollection.endpoints, endpoint];

        const updatedCollection: APICollection = {
            ...activeCollection,
            endpoints: updatedEndpoints,
            updatedAt: Date.now(),
        };

        await saveCollection(updatedCollection);
        setActiveCollection(updatedCollection);
        await loadCollections();
        setShowEndpointModal(false);
        setEditingEndpoint(null);
    };

    const handleDeleteEndpoint = async (endpointId: string) => {
        if (!activeCollection) return;
        if (!await confirm({
            title: t('deleteEndpoint'),
            description: t('deleteEndpointConfirm'),
            variant: "danger",
            confirmText: t('delete'),
            cancelText: t('cancel')
        })) return;

        const updatedCollection: APICollection = {
            ...activeCollection,
            endpoints: activeCollection.endpoints.filter(e => e.id !== endpointId),
            updatedAt: Date.now(),
        };

        await saveCollection(updatedCollection);
        setActiveCollection(updatedCollection);
        await loadCollections();
    };

    // Navigation
    const openCollection = (collection: APICollection) => {
        setActiveCollection(collection);
        setView('collection');
    };

    const openEndpointDocs = (endpoint: APIEndpoint) => {
        setActiveEndpoint(endpoint);
        setView('docs');
    };

    const goBack = () => {
        if (view === 'docs') {
            setActiveEndpoint(null);
            setView('collection');
        } else if (view === 'collection') {
            setActiveCollection(null);
            setView('list');
        }
    };

    // Filter collections
    const filteredCollections = collections.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.baseUrl.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Method color helper
    const getMethodColor = (method: string) => {
        const colors: Record<string, string> = {
            GET: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            POST: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            PUT: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
            PATCH: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            DELETE: 'bg-red-500/10 text-red-500 border-red-500/20',
        };
        return colors[method] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    };

    return (
        <main className="min-h-screen flex flex-col pb-10">
            {/* Header */}
            <div className="pt-6 px-6 pb-4 border-b border-[var(--border-color)] bg-[var(--bg-color)] sticky top-0 z-30">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {view !== 'list' && (
                            <button
                                onClick={goBack}
                                className="p-2 hover:bg-[var(--card-bg)] rounded-lg transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 rotate-180" />
                            </button>
                        )}
                        <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500">
                            <ToolIcon name="FileText" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">
                                {view === 'list' ? t('title') :
                                    view === 'docs' && activeEndpoint ? activeEndpoint.name :
                                        activeCollection?.name}
                            </h1>
                            <p className="text-xs text-[var(--muted-text)] hidden sm:block">
                                {view === 'list' ? t('description') :
                                    view === 'docs' && activeEndpoint ? `${activeEndpoint.method} ${activeEndpoint.path}` :
                                        activeCollection?.baseUrl}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {view === 'list' && (
                            <>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-text)]" />
                                    <input
                                        type="text"
                                        placeholder={t('searchCollections')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 pr-4 h-9 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-500/30"
                                    />
                                </div>
                                <LiquidButton
                                    onClick={() => setShowCollectionModal(true)}
                                    className="h-9"
                                >
                                    <Plus className="w-4 h-4 mr-1" /> {t('newCollection')}
                                </LiquidButton>
                            </>
                        )}
                        {view === 'collection' && activeCollection && (
                            <>
                                <LiquidButton
                                    variant="secondary"
                                    onClick={() => {
                                        setEditingCollection(activeCollection);
                                        setShowCollectionModal(true);
                                    }}
                                    className="h-9"
                                >
                                    <Edit3 className="w-4 h-4 mr-1" /> {t('edit')}
                                </LiquidButton>
                                <LiquidButton
                                    onClick={() => setShowEndpointModal(true)}
                                    className="h-9"
                                >
                                    <Plus className="w-4 h-4 mr-1" /> {t('addEndpoint')}
                                </LiquidButton>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
                    </div>
                ) : view === 'list' ? (
                    // Collection List View
                    <div>
                        {filteredCollections.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="p-4 bg-purple-500/10 rounded-2xl mb-4">
                                    <FolderOpen className="w-12 h-12 text-purple-500" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">
                                    {searchQuery ? t('noCollectionsFound') : t('noCollectionsYet')}
                                </h2>
                                <p className="text-[var(--muted-text)] text-sm mb-4 max-w-md">
                                    {searchQuery
                                        ? t('tryDifferentSearch')
                                        : t('createFirstCollection')}
                                </p>
                                {!searchQuery && (
                                    <LiquidButton onClick={() => setShowCollectionModal(true)}>
                                        <Plus className="w-4 h-4 mr-1" /> {t('createCollection')}
                                    </LiquidButton>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredCollections.map((collection) => (
                                    <div
                                        key={collection.id}
                                        className="group bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 hover:border-purple-500/50 transition-all cursor-pointer"
                                        onClick={() => openCollection(collection)}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                                    <FileText className="w-5 h-5 text-purple-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{collection.name}</h3>
                                                    <p className="text-xs text-[var(--muted-text)] mt-0.5">
                                                        {collection.endpoints.length} {collection.endpoints.length !== 1 ? t('endpoints') : t('endpoint')}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteCollection(collection.id);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-[var(--muted-text)] font-mono bg-[var(--bg-color)] px-2 py-1 rounded truncate">
                                            {collection.baseUrl}
                                        </p>
                                        {collection.endpoints.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {collection.endpoints.slice(0, 4).map((ep) => (
                                                    <span
                                                        key={ep.id}
                                                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${getMethodColor(ep.method)}`}
                                                    >
                                                        {ep.method}
                                                    </span>
                                                ))}
                                                {collection.endpoints.length > 4 && (
                                                    <span className="text-[10px] text-[var(--muted-text)] px-1.5 py-0.5">
                                                        +{collection.endpoints.length - 4} {t('more')}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : view === 'collection' && activeCollection ? (
                    // Collection Detail View
                    <div>
                        {activeCollection.endpoints.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="p-4 bg-blue-500/10 rounded-2xl mb-4">
                                    <FileText className="w-12 h-12 text-blue-500" />
                                </div>
                                <h2 className="text-lg font-semibold mb-2">{t('noEndpointsYet')}</h2>
                                <p className="text-[var(--muted-text)] text-sm mb-4 max-w-md">
                                    {t('addFirstEndpoint')}
                                </p>
                                <LiquidButton onClick={() => setShowEndpointModal(true)}>
                                    <Plus className="w-4 h-4 mr-1" /> {t('addEndpoint')}
                                </LiquidButton>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {activeCollection.endpoints.map((endpoint) => (
                                    <div
                                        key={endpoint.id}
                                        className="group flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 hover:border-purple-500/50 transition-all cursor-pointer"
                                        onClick={() => openEndpointDocs(endpoint)}
                                    >
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded border min-w-[65px] text-center ${getMethodColor(endpoint.method)}`}>
                                            {endpoint.method}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium truncate">{endpoint.name}</h3>
                                            </div>
                                            <p className="text-sm text-[var(--muted-text)] font-mono truncate">
                                                {endpoint.path}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingEndpoint(endpoint);
                                                    setShowEndpointModal(true);
                                                }}
                                                className="p-2 hover:bg-[var(--bg-color)] rounded-lg"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteEndpoint(endpoint.id);
                                                }}
                                                className="p-2 hover:bg-red-500/10 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-[var(--muted-text)]" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : view === 'docs' && activeEndpoint && activeCollection ? (
                    <DocumentationView
                        endpoint={activeEndpoint}
                        collection={activeCollection}
                    />
                ) : null}
            </div>

            {/* Collection Modal */}
            {showCollectionModal && (
                <CollectionEditor
                    collection={editingCollection}
                    onSave={handleSaveCollection}
                    onClose={() => {
                        setShowCollectionModal(false);
                        setEditingCollection(null);
                    }}
                />
            )}

            {/* Endpoint Modal */}
            {showEndpointModal && activeCollection && (
                <EndpointEditor
                    endpoint={editingEndpoint}
                    collection={activeCollection}
                    onSave={handleSaveEndpoint}
                    onClose={() => {
                        setShowEndpointModal(false);
                        setEditingEndpoint(null);
                    }}
                />
            )}
        </main>
    );
}
