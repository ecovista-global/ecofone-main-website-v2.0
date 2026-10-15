'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StoresPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#stores-section');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f8fbf9] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold text-slate-700">Loading EcoFone Stores...</p>
      </div>
    </div>
  );
}
