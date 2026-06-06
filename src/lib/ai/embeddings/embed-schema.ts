'use server';

import { embedMany } from 'ai';
import { nvidia } from '../provider';
import type { Table, EmbeddedTable } from '../../types/schema';

export async function embedSchemaContext(tables: Table[]): Promise<EmbeddedTable[]> {
  if (tables.length === 0) return [];
  
  // Convert each table to a text representation
  const texts = tables.map(t => 
    `Table: ${t.name}\nColumns: ${t.columns.map(c => `${c.name} ${c.type}${c.isPrimaryKey ? ' PK' : ''}${c.isForeignKey ? ' FK' : ''}`).join(', ')}`
  );

  try {
    const { embeddings } = await embedMany({
      // Assuming nv-embedqa-e5-v5 is available on the integrate API
      model: nvidia.embedding('nvidia/nv-embedqa-e5-v5'),
      values: texts,
    });

    return tables.map((t, i) => ({
      tableId: t.id,
      tableName: t.name,
      text: texts[i],
      embedding: embeddings[i],
    }));
  } catch (error) {
    console.error("Error embedding schema:", error);
    // If embedding fails (e.g. model not available), fallback to empty embeddings
    return tables.map((t, i) => ({
      tableId: t.id,
      tableName: t.name,
      text: texts[i],
      embedding: [],
    }));
  }
}
