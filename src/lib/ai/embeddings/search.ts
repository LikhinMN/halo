'use server';

import { embed, cosineSimilarity } from 'ai';
import { nvidia } from '../provider';
import type { EmbeddedTable } from '../../types/schema';

export async function findRelevantTables(query: string, embeddedTables: EmbeddedTable[]) {
  if (embeddedTables.length === 0) return [];
  
  try {
    const { embedding: queryEmbedding } = await embed({
      model: nvidia.embedding('nvidia/nv-embedqa-e5-v5'),
      value: query,
    });

    const ranked = embeddedTables
      .filter(t => t.embedding && t.embedding.length > 0)
      .map(t => ({ ...t, similarity: cosineSimilarity(queryEmbedding, t.embedding) }))
      .sort((a, b) => b.similarity - a.similarity);

    return ranked.slice(0, 5); // Top 5 most relevant tables
  } catch (error) {
    console.error("Error searching tables:", error);
    return [];
  }
}
