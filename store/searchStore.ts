// store/searchStore.ts
import { create } from 'zustand';

export type Post = {
  slug: string;
  title: string;
  summary?: string;
};

type SearchState = {
  keyword: string;
  results: Post[];
  allPosts: Post[];
  setKeyword: (keyword: string) => void;
  setAllPosts: (posts: Post[]) => void;
};

export const useSearchStore = create<SearchState>((set, get) => ({
  keyword: '',
  results: [],
  allPosts: [],
  setAllPosts: (posts) => {
    set({ allPosts: posts, results: posts }); // 初期状態ですべて表示
  },
  setKeyword: (keyword) => {
    const allPosts = get().allPosts;
    const filtered =
      keyword === ''
        ? allPosts
        : allPosts.filter((post) =>
            (post.title + (post.summary ?? '')).toLowerCase().includes(keyword.toLowerCase())
          );

    set({ keyword, results: filtered });
  },
}));
