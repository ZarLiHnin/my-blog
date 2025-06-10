import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

type PostData = {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
  category?: string;
  tags?: string[];
};

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    contentHtml,
  };
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary ?? '',
      thumbnail: data.thumbnail ?? '',
      category: data.category ?? '',
      tags: data.tags ?? [],
    };
  });

  // 日付降順でソート
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}

// すべてのタグ一覧を取得
export function getAllTags(posts: PostData[]) {
  const tags = posts.flatMap((post) => post.tags || []);
  return Array.from(new Set(tags));
}

// カテゴリ一覧を取得
export function getAllCategories(posts: PostData[]) {
  const categories = posts.map((post) => post.category);
  return Array.from(new Set(categories));
}
