'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps, type Node } from '@xyflow/react';
import { Key, Link2 } from 'lucide-react';
import { TableNodeData } from '@/lib/types/schema';
import { cn } from '@/lib/utils';

export type SchemaTableNode = Node<TableNodeData, 'tableNode'>;

export const TableNode = memo(({ data }: NodeProps<SchemaTableNode>) => {
  return (
    <div className="bg-card text-card-foreground border rounded-xl shadow-lg w-72 flex flex-col overflow-hidden font-sans border-border">
      <div className={cn("px-4 py-2 bg-secondary/50 border-b border-border flex items-center justify-between", data.color)}>
        <span className="font-bold text-[11px] tracking-wider uppercase text-secondary-foreground/80">{data.label}</span>
      </div>
      
      <div className="flex flex-col py-2">
        {data.columns.map((col) => (
          <div key={col.name} className="relative group px-4 py-1.5 flex items-center justify-between hover:bg-muted/50 transition-colors">
            {/* Target Handle (Left) */}
            <Handle 
              type="target"
              position={Position.Left}
              id={`${col.name}-target`}
              className="w-3 h-3 !bg-blue-500/50 border-2 border-background -ml-1.5 hover:!bg-blue-500 transition-colors"
            />
            
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              {col.isPrimaryKey ? (
                <Key className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
              ) : col.isForeignKey ? (
                <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 shrink-0" />
              )}
              
              <span className="text-sm font-mono truncate">{col.name}</span>
            </div>
            
            <span className="text-[10px] font-mono text-muted-foreground ml-2 shrink-0">{col.type}</span>

            {/* Source Handle (Right) */}
            <Handle 
              type="source"
              position={Position.Right}
              id={`${col.name}-source`}
              className="w-3 h-3 !bg-blue-500/50 border-2 border-background -mr-1.5 hover:!bg-blue-500 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

TableNode.displayName = 'TableNode';
