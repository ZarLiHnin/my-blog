'use client';

import { motion } from 'framer-motion';
import ArticleCard from './ArticleCard';

type Props = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
  category?: string;
  tags?: string[];
};

export default function AnimatedArticleCard({
  slug,
  title,
  date,
  summary,
  thumbnail,
  category,
  tags,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ArticleCard
        slug={slug}
        title={title}
        date={date}
        summary={summary}
        thumbnail={thumbnail}
        category={category}
        tags={tags}
      />
    </motion.div>
  );
}
