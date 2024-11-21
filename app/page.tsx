'use client';

import { KernelProvider } from './contexts/KernelContext';
import Desktop from './components/Desktop';

export default function Home() {
  return (
    <KernelProvider>
      <Desktop />
    </KernelProvider>
  );
}
