'use client';

import { useSearchStore } from '@/store/searchStore';

export default function SearchForm() {
  const keyword = useSearchStore((state) => state.keyword);
  const setKeyword = useSearchStore((state) => state.setKeyword);

  return (
    <form className="max-w-xl mx-auto mt-6">
      <input
        type="search"
        placeholder="検索ワードを入力..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </form>
  );
}
