// components/ArticleCard.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleCard from '@/components/ArticleCard';

describe('ArticleCard', () => {
  test('summaryとthumbnailありの場合、すべて表示される', () => {
    render(
      <ArticleCard
        title="サンプル記事"
        date="2025-06-09"
        summary="これはサンプルの要約です"
        slug="sample-post"
        thumbnail="/sample.jpg"
      />
    );

    expect(screen.getByText('サンプル記事')).toBeInTheDocument();
    expect(screen.getByText('2025-06-09')).toBeInTheDocument();
    expect(screen.getByText('これはサンプルの要約です')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('/sample.jpg'));
    expect(screen.getByRole('link')).toHaveAttribute('href', '/posts/sample-post');
  });

  test('summaryとthumbnailがない場合でも、titleとdateとリンクが表示される', () => {
    render(<ArticleCard title="記事2" date="2025-06-08" slug="no-summary-no-image" />);

    expect(screen.getByText('記事2')).toBeInTheDocument();
    expect(screen.getByText('2025-06-08')).toBeInTheDocument();
    expect(screen.queryByText('これはサンプルの要約です')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
