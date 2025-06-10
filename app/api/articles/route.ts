import { getSortedPostsData } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = getSortedPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse(JSON.stringify({ message: 'サーバー内部エラーが発生しました。' }), {
      status: 500,
    });
  }
}
