'use client';

import { useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    NodeChange,
    EdgeChange,
    applyNodeChanges,
    applyEdgeChanges,
    Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { useTranslations } from 'next-intl';

import { useSchemaStore } from '../store/SchemaStore';
import TableNode from './TableNode';
import { Table, Relation } from '../core/InternalModel';

const nodeTypes = {
    table: TableNode,
};

export default function DesignerCanvas() {
    const { schema, updateTable, addRelation } = useSchemaStore();
    const t = useTranslations('VisualDatabaseDesigner');

    // Convert ISM tables to React Flow nodes
    const nodes: Node[] = Object.values(schema.tables).map((table) => ({
        id: table.id,
        type: 'table',
        position: table.position,
        data: { ...table },
    }));

    // Convert ISM relations to React Flow edges
    const edges: Edge[] = schema.relations.map((rel) => ({
        id: rel.id,
        source: rel.fromTable,
        sourceHandle: `${rel.fromColumn}-right`,
        target: rel.toTable,
        targetHandle: `${rel.toColumn}-left`,
        animated: true,
        style: { stroke: '#f97316', strokeWidth: 2, strokeDasharray: 5 }, // Orange-500
    }));

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            // We need to sync position changes back to our store
            changes.forEach((change) => {
                if (change.type === 'position' && change.position) {
                    updateTable(change.id, { position: change.position });
                }
            });
        },
        [updateTable]
    );

    const onConnect = useCallback(
        (params: Connection) => {
            if (!params.source || !params.target || !params.sourceHandle || !params.targetHandle) return;

            const fromColumn = params.sourceHandle.replace('-right', '');
            const toColumn = params.targetHandle.replace('-left', '');

            addRelation({
                fromTable: params.source,
                fromColumn,
                toTable: params.target,
                toColumn,
                type: '1:n', // Default type
            });
        },
        [addRelation]
    );

    // Auto Layout
    const onLayout = useCallback(() => {
        const layoutedNodes = getLayoutedElements(nodes, edges);

        // Update all node positions in store
        layoutedNodes.forEach(node => {
            updateTable(node.id, { position: node.position });
        });

        // Fit view after layout
        setTimeout(() => {
            // We need access to react flow instance to fit view perfectly, 
            // but for now let's just let the positions settle.
        }, 100);
    }, [nodes, edges, updateTable]);

    return (
        <div className="w-full h-full bg-gray-50 dark:bg-[#121212] relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onConnect={onConnect}
                fitView
                className="bg-transparent"
                style={{ backgroundColor: 'transparent' }}
            >
                <Background
                    className="!bg-transparent"
                    color="#cbd5e1" // Slate-300 for visible dots
                    gap={20}
                    size={1}
                    variant={'dots' as any}
                    style={{ backgroundColor: 'transparent' }}
                />
                <Controls className="!bg-white dark:!bg-[#1e1e1e] !border-slate-200 dark:!border-white/10 !shadow-sm [&>button]:!border-b-slate-200 dark:[&>button]:!border-b-white/10 [&>button]:!fill-slate-600 dark:[&>button]:!fill-slate-300 hover:[&>button]:!bg-slate-50 dark:hover:[&>button]:!bg-white/5" />
                <MiniMap
                    nodeColor="#f97316" // Orange
                    maskColor="rgba(255, 255, 255, 0.6)" // White mask for light mode
                    className="!bg-white dark:!bg-[#1e1e1e] !border-slate-200 dark:!border-white/10 !shadow-lg rounded-lg overflow-hidden"
                    zoomable
                    pannable
                />
                <Panel position="top-right">
                    <button
                        onClick={onLayout}
                        className="bg-white dark:bg-[#1e1e1e] text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-1.5 rounded-md shadow-sm border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center gap-2 transition-all"
                    >
                        {t('canvas.autoLayout')}
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
}

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // Direction: TB (Top-Bottom) or LR (Left-Right)
    dagreGraph.setGraph({ rankdir: 'LR' });

    nodes.forEach((node) => {
        // We need dimensions. If not available, estimate.
        // TableNode min-width is 260px. Height variable. Let's assume average.
        dagreGraph.setNode(node.id, { width: 300, height: 200 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    return nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - 150, // Center anchor
                y: nodeWithPosition.y - 100,
            },
        };
    });
};
