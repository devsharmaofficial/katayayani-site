'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SearchOrders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      if (query.trim()) {
        router.push(`/admin/dashboard?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push('/admin/dashboard');
      }
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, phone or ID..."
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full md:w-80 outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        Search
      </button>
      {searchParams.get('q') && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            router.push('/admin/dashboard');
          }}
          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Clear
        </button>
      )}
    </form>
  );
}
