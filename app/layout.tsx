// app/layout.tsx（サーバーコンポーネント、metadataをここに書く）
import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';
import AnimatedMain from '@/components/AnimatedMain';

export const metadata = {
  title: 'My Blog',
  description: '高機能なNext.jsブログアプリ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <header className="bg-pink-800 text-white p-4">
          <nav className="max-w-4xl mx-auto flex justify-between">
            <Link href="/" className="text-lg font-bold">
              My Blog
            </Link>
            <Link href={`/articles`}>全記事一覧</Link>
          </nav>
        </header>

        {/* ここでアニメーションする子コンポーネントを呼ぶ */}
        <AnimatedMain>{children}</AnimatedMain>

        <footer className="bg-gray-100 text-center text-sm text-gray-500 p-4">
          © 2025 Zarli Blog. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
