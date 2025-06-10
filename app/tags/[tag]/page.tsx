import ArticleCard from '@/components/ArticleCard';
import { getSortedPostsData } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) })); // ✅ エンコード
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const decodedTag = decodeURIComponent(params.tag); // ✅ デコード
  const posts = getSortedPostsData().filter((post) => post.tags?.includes(decodedTag));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">タグ: {decodedTag}</h1>
      {posts.map((post) => (
        <ArticleCard key={post.slug} {...post} />
      ))}
    </div>
  );
}
