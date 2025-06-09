import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllPostSlugs(); // ← ここで全slugを返す
}

export default async function PostPage({ params }: Props) {
  const post = await getPostData(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* 2カラムのグリッドレイアウト */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 本文エリア：md以上は2カラム分 */}
        <article className="prose prose-lg dark:prose-invert max-w-none md:col-span-2">
          <h1 className="mb-4">{post.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{post.date}</p>

          {/* Markdownから変換したHTML */}
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>

        {/* サイドバー */}
        <aside className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-600 pb-1">
              プロフィール
            </h2>
            <div className="flex items-start space-x-4">
              <img
                src="/images/profile.jpg"
                alt="プロフィール写真"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-gray-700 dark:text-gray-300">
                <p className="font-semibold">Zar Li</p>
                <p>フロントエンドエンジニア / ブロガー</p>
                <p>趣味: プログラミング、写真撮影、読書</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
