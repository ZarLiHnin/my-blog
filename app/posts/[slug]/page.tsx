import { getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return [{ slug: 'hello-world' }];
}

export default async function PostPage({ params }: Props) {
  const post = await getPostData(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div className="prose">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
    </article>
  );
}
