import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ArticleListClient from '@/components/ArticleListClient';
import Image from 'next/image';

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
        <aside className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-pink-600 pb-2 text-pink-700 dark:text-pink-400 dark:border-pink-400">
              プロフィール
            </h2>

            {/* 上部: 画像＋名前＋職業 */}
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src="/images/profile.jpg"
                alt="プロフィール写真"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  Zar Li Hnin
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  フロントエンドエンジニア / ブロガー
                </p>
              </div>
            </div>

            {/* 詳細プロフィール */}
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p>
                <b>趣味:</b> プログラミング、写真撮影、読書
              </p>
              <p>
                <b>現在学習中:</b> Next.js App Router / GraphQL
              </p>
              <p>
                <b>ブログの目的:</b> 初心者エンジニア向けの技術共有 / 成長の記録として
              </p>
            </div>
          </section>
          <h2 className="text-lg font-semibold mb-4">最新記事</h2>
          <ArticleListClient /> {/* propsで制限する設計にしても◎ */}
        </aside>
      </div>
    </main>
  );
}
