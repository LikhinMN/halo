import { create } from 'zustand';
import type { SQLDialect } from '../types/schema';

interface AppState {
  panelSizes: [number, number];
  selectedTableId: string | null;
  sqlDialect: SQLDialect;
  generatedQuery: string | null;
  isSchemaModified: boolean;
  
  setPanelSizes: (sizes: [number, number]) => void;
  setSelectedTableId: (id: string | null) => void;
  setSqlDialect: (dialect: SQLDialect) => void;
  setGeneratedQuery: (query: string | null) => void;
  setIsSchemaModified: (modified: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  panelSizes: [40, 60],
  selectedTableId: null,
  sqlDialect: 'postgresql',
  generatedQuery: null,
  isSchemaModified: false,
  
  setPanelSizes: (sizes) => set({ panelSizes: sizes }),
  setSelectedTableId: (id) => set({ selectedTableId: id }),
  setSqlDialect: (dialect) => set({ sqlDialect: dialect }),
  setGeneratedQuery: (query) => set({ generatedQuery: query }),
  setIsSchemaModified: (modified) => set({ isSchemaModified: modified }),
}));
