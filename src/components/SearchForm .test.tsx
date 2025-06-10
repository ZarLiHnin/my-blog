// SearchForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '@/components/SearchForm';
import { useSearchStore } from '@/store/searchStore';

// jest.mock でモック化
jest.mock('@/store/searchStore');

// 型エラー回避のためキャスト
const mockedUseSearchStore = useSearchStore as unknown as jest.Mock;

describe('SearchForm', () => {
  it('初期キーワードが表示される', () => {
    mockedUseSearchStore.mockImplementation((selector) =>
      selector({
        keyword: 'テストキーワード',
        setKeyword: jest.fn(),
      })
    );

    render(<SearchForm />);

    expect(screen.getByPlaceholderText('検索ワードを入力...')).toHaveValue('テストキーワード');
  });

  it('入力するとsetKeywordが呼ばれる', () => {
    const setKeywordMock = jest.fn();

    mockedUseSearchStore.mockImplementation((selector) =>
      selector({
        keyword: '',
        setKeyword: setKeywordMock,
      })
    );

    render(<SearchForm />);

    const input = screen.getByPlaceholderText('検索ワードを入力...');
    fireEvent.change(input, { target: { value: '新しい文字列' } });

    expect(setKeywordMock).toHaveBeenCalledWith('新しい文字列');
  });
});
