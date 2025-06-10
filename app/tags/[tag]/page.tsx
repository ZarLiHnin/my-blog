import { getSortedPostsData } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';

type Props = {
  params: Promise<{ tag: string }>;
};

export default async function TagPage({ params }: Props) {
  const resolvedParams = await params;
  const decodedTag = decodeURIComponent(resolvedParams.tag);
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
