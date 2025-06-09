// app/page.tsx
import { getSortedPostsData } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

export const revalidate = 60;

export default function HomePage() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">記事一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(({ slug, title, date, summary, thumbnail }) => (
          <ArticleCard
            key={slug}
            slug={slug}
            title={title}
            date={date}
            summary={summary}
            thumbnail={thumbnail}
          />
        ))}
      </div>
    </main>
  );
}
