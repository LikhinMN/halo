'use client';

import { ReactFlow, Background, useReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSchemaStore } from '@/lib/store/schema-store';
import { TableNode } from './table-node';
import { SchemaToolbar } from './schema-toolbar';
import { DatabaseSchema } from '@/lib/types/schema';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
const nodeTypes = {
  tableNode: TableNode,
};

function SchemaCanvasInner() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useSchemaStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
    }))
  );
  const { fitView } = useReactFlow();
  
  // Fit view whenever nodes change and we have nodes
  useEffect(() => {
    if (nodes.length > 0) {
      const timer = setTimeout(() => {
        fitView({ padding: 0.2, duration: 400 });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nodes.length, fitView]);

  return (
    <div className="w-full h-full bg-background relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
        minZoom={0.1}
        maxZoom={1.5}
      >
        <Background gap={16} size={1} color="var(--border)" />
        <SchemaToolbar />
      </ReactFlow>
    </div>
  );
}

export function SchemaCanvas() {
  return (
    <div className="w-full h-full border-l border-border">
      <ReactFlowProvider>
        <SchemaCanvasInner />
      </ReactFlowProvider>
    </div>
  );
}
