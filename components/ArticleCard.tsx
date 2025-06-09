// components/ArticleCard.tsx
import React from 'react';

type ArticleCardProps = {
  title: string;
  date: string;
  summary?: string;
  slug: string;
  thumbnail?: string; // 任意のサムネイル画像URL
};

const ArticleCard: React.FC<ArticleCardProps> = ({ title, date, summary, slug, thumbnail }) => {
  return (
    <a
      href={`/posts/${slug}`}
      className="block rounded-lg border border-gray-300 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 dark:border-gray-700 dark:hover:border-indigo-400"
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={`Thumbnail for ${title}`}
          className="mb-4 w-full h-48 object-cover rounded-md"
          loading="lazy"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      <time className="block mb-2 text-sm text-gray-500 dark:text-gray-400">{date}</time>
      {summary && <p className="text-gray-700 dark:text-gray-300">{summary}</p>}
    </a>
  );
};

export default ArticleCard;
