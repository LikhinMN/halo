// ─── Column & Table Types ───────────────────────────────────────────

export interface ColumnReference {
  table: string;
  column: string;
}

export interface Column {
  name: string;
  type: string; // e.g. 'VARCHAR(255)', 'INTEGER', 'TIMESTAMP'
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isNullable: boolean;
  isUnique?: boolean;
  defaultValue?: string;
  references?: ColumnReference; // FK reference
}

export interface Table {
  id: string; // Unique ID for React Flow node
  name: string; // SQL table name
  columns: Column[];
}

// ─── Relationship Types ─────────────────────────────────────────────

export type RelationshipType = 'one-to-one' | 'one-to-many' | 'many-to-many';

export interface SchemaRelationship {
  id: string; // Edge ID
  sourceTable: string; // Source table ID
  sourceColumn: string;
  targetTable: string; // Target table ID
  targetColumn: string;
  type: RelationshipType;
}

// ─── Database Schema ────────────────────────────────────────────────

export interface DatabaseSchema {
  tables: Table[];
  relationships: SchemaRelationship[];
}

// ─── SQL Dialect ────────────────────────────────────────────────────

export type SQLDialect = 'postgresql' | 'mysql' | 'sqlite';

// ─── Embedded Table (for embedding/search) ──────────────────────────

export interface EmbeddedTable {
  tableId: string;
  tableName: string;
  text: string;
  embedding: number[];
}

// ─── React Flow Node Data ───────────────────────────────────────────

export interface TableNodeData extends Record<string, unknown> {
  label: string; // Table name
  columns: Column[];
  color?: string; // Header accent color
}
