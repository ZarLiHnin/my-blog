'use client';

import { useEffect, useState } from 'react';
import { useSearchStore } from '@/store/searchStore';
import SearchForm from '@/components/SearchForm';

export default function ArticlesPage() {
  const results = useSearchStore((state) => state.results);
  const setAllPosts = useSearchStore((state) => state.setAllPosts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/articles');

        // ✅ ここでステータスコードに応じてメッセージを出し分け
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('記事が見つかりませんでした。');
          } else if (res.status === 500) {
            throw new Error('サーバーで問題が発生しました。');
          } else {
            throw new Error(`不明なエラーが発生しました（コード: ${res.status}）`);
          }
        }

        const data = await res.json();
        setAllPosts(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('不明なエラーが発生しました。');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setAllPosts]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">全記事一覧（検索対応）</h1>
      <SearchForm />
      <br />
      {isLoading ? (
        <p className="text-gray-600">読み込み中...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : results.length === 0 ? (
        <p>該当する記事がありません。</p>
      ) : (
        <ul className="space-y-2">
          {results.map((post) => (
            <li key={post.slug}>
              <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
