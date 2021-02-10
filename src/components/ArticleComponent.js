// ここに記事コンポーネントを記述する
// これは初期値としてのみ使用する
export const ArticleComponent = {
  'heading': {
    'normal': {
      'order': 0,
      'type': 'heading',
      'option': 'normal',
      'data': {
        'content': '見出しサンプル'
      }
    },
    'with_image': {
      'order': 0,
      'type': 'heading',
      'option': 'with_image',
      'data': {
        'content': '見出しサンプル',
        'image_url': 'hoge.png'
      }
    },
  },
  'paragraph': {
    'normal': {
      'order': 0,
      'type': 'paragraph',
      'option': 'normal',
      'data': {
        'content': '本文'
      }
    }
  }
}