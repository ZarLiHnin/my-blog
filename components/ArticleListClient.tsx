'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Article = {
  slug: string;
  title: string;
  date: string;
};

export default function ArticleListClient() {
  const { data, error, isLoading } = useSWR<Article[]>('/api/articles', fetcher);

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-500">エラーが発生しました</p>;
  if (!data || data.length === 0) return <p>記事が見つかりませんでした</p>;

  // 日付で降順ソートして最新2件を取得
  const sortedArticles = data
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return (
    <ul className="list-disc pl-5 space-y-2">
      {sortedArticles.map((article) => (
        <li key={article.slug}>
          <a href={`/posts/${article.slug}`} className="text-blue-600 hover:underline">
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
