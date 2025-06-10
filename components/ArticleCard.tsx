import React from 'react';
import Image from 'next/image';

type ArticleCardProps = {
  title: string;
  date: string;
  summary?: string;
  slug: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
};

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  date,
  summary,
  slug,
  thumbnail,
  category,
  tags,
}) => {
  return (
    <div className="rounded-lg border border-gray-300 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 dark:border-gray-700 dark:hover:border-indigo-400">
      <a href={`/posts/${slug}`}>
        {thumbnail && (
          <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
            <Image
              src={thumbnail}
              alt={`Thumbnail for ${title}`}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        <time className="block mb-2 text-sm text-gray-500 dark:text-gray-400">{date}</time>
        {summary && <p className="text-gray-700 dark:text-gray-300">{summary}</p>}
      </a>
      <div className="mt-2 text-sm text-pink-600">
        {category && (
          <a href={`/categories/${encodeURIComponent(category)}`} className="mr-2">
            #{category}
          </a>
        )}

        {tags?.map((tag) => (
          <a key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="mr-2">
            #{tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;
