import { create } from 'zustand';
import type { Table, SchemaRelationship, DatabaseSchema, TableNodeData } from '../types/schema';
import { type Node, type Edge, type Connection, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, addEdge } from '@xyflow/react';
import dagre from 'dagre';

interface SchemaState {
  tables: Table[];
  relationships: SchemaRelationship[];
  nodes: Node[];
  edges: Edge[];

  setSchema: (schema: DatabaseSchema) => void;
  addTable: (table: Table) => void;
  updateTable: (id: string, updates: Partial<Table>) => void;
  removeTable: (id: string) => void;
  addRelationship: (rel: SchemaRelationship) => void;
  removeRelationship: (id: string) => void;
  
  // React Flow state sync
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  syncToReactFlow: () => void;
}

export const useSchemaStore = create<SchemaState>((set, get) => ({
  tables: [],
  relationships: [],
  nodes: [],
  edges: [],

  setSchema: (schema) => {
    console.log('[DEBUG] Setting schema:', schema);
    set({ tables: schema.tables, relationships: schema.relationships });
    get().syncToReactFlow();
  },
  
  addTable: (table) => {
    console.log('[DEBUG] Adding table:', table.name);
    set((state) => ({ tables: [...state.tables, table] }));
    get().syncToReactFlow();
  },

  updateTable: (id, updates) => {
    console.log('[DEBUG] Updating table:', id);
    set((state) => ({
      tables: state.tables.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
    get().syncToReactFlow();
  },

  removeTable: (id) => {
    console.log('[DEBUG] Removing table:', id);
    set((state) => ({
      tables: state.tables.filter((t) => t.id !== id),
      relationships: state.relationships.filter(
        (r) => r.sourceTable !== id && r.targetTable !== id
      ),
    }));
    get().syncToReactFlow();
  },

  addRelationship: (rel) => {
    console.log('[DEBUG] Adding relationship:', rel);
    set((state) => ({ relationships: [...state.relationships, rel] }));
    get().syncToReactFlow();
  },

  removeRelationship: (id) => {
    console.log('[DEBUG] Removing relationship:', id);
    set((state) => ({
      relationships: state.relationships.filter((r) => r.id !== id),
    }));
    get().syncToReactFlow();
  },

  setNodes: (nodesOrUpdater) => {
      set((state) => ({
        nodes: typeof nodesOrUpdater === 'function' ? nodesOrUpdater(state.nodes) : nodesOrUpdater
      }));
  },
  
  setEdges: (edgesOrUpdater) => {
      set((state) => ({
        edges: typeof edgesOrUpdater === 'function' ? edgesOrUpdater(state.edges) : edgesOrUpdater
      }));
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },
  
  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge({ ...connection, animated: true, type: 'smoothstep', style: { stroke: 'oklch(0.75 0.15 195)', strokeWidth: 2 } }, state.edges),
    }));
  },

  syncToReactFlow: () => {
    const { tables, relationships } = get();
    console.log('[DEBUG] Syncing to React Flow. Tables:', tables.length, 'Relationships:', relationships.length);
    
    if (tables.length === 0) {
      set({ nodes: [], edges: [] });
      return;
    }

    // Convert tables to nodes
    const initialNodes: Node[] = tables.map((t) => {
      return {
        id: t.id,
        type: 'tableNode',
        position: { x: 0, y: 0 },
        data: {
          label: t.name,
          columns: t.columns,
        },
      };
    });

    // Convert relationships to edges
    const edges: Edge[] = relationships.map((r) => ({
      id: r.id,
      source: r.sourceTable,
      sourceHandle: `${r.sourceColumn}-source`,
      target: r.targetTable,
      targetHandle: `${r.targetColumn}-target`,
      type: 'smoothstep',
      animated: true,
      style: { stroke: 'oklch(0.75 0.15 195)', strokeWidth: 2 },
    }));

    // Apply auto layout
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    
    const nodeWidth = 288; // Matching w-72 (288px)
    const nodeHeaderHeight = 36;
    const rowHeight = 32;
    
    dagreGraph.setGraph({ rankdir: 'LR', nodesep: 50, ranksep: 100 }); // Left to Right layout
    
    initialNodes.forEach((node) => {
      const height = nodeHeaderHeight + ((node.data as TableNodeData).columns.length * rowHeight) + 10;
      dagreGraph.setNode(node.id, { width: nodeWidth, height: height });
    });
    
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
    
    dagre.layout(dagreGraph);
    
    const nodes = initialNodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const height = nodeHeaderHeight + ((node.data as TableNodeData).columns.length * rowHeight) + 10;
      
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - height / 2,
        }
      };
    });

    console.log('[DEBUG] Generated nodes and edges:', { nodes: nodes.length, edges: edges.length });
    set({ nodes, edges });
  },
}));
