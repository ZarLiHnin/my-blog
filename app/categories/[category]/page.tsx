import { getSortedPostsData } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);
  const posts = getSortedPostsData().filter((post) => post.category === decodedCategory);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">カテゴリ: {decodedCategory}</h1>
      {posts.map((post) => (
        <ArticleCard key={post.slug} {...post} />
      ))}
    </div>
  );
}
