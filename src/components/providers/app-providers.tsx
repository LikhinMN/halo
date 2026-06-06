'use client';

import { ReactNode } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { ThemeProvider } from 'next-themes';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ReactFlowProvider>
        {children}
      </ReactFlowProvider>
    </ThemeProvider>
  );
}
