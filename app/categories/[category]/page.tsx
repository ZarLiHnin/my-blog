import { getSortedPostsData } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  return categories.map((category) => ({ category: encodeURIComponent(category) })); // ✅ エンコード
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const decodedCategory = decodeURIComponent(params.category); // ✅ デコード
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
