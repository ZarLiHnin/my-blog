import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - ページが見つかりません</h1>
      <p className="mb-6 text-gray-600">
        お探しのページは存在しないか、削除された可能性があります。
      </p>
      <Link href="/" className="text-blue-600 underline hover:text-blue-800 transition">
        トップページに戻る
      </Link>
    </main>
  );
}
