// ここに記事コンポーネントを記述する
// これは初期値としてのみ使用する
export const ArticleComponent = {
  'heading': {
    'normal': {
      'order': 0,
      'type': 'heading',
      'option': 'normal',
      'data': {
        'content': '<h1>見出しサンプル</h1>',
        'textAlign':'left',

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
        'content': '<p>本文</p>',
        'textAlign':'left',
        'padding':20
      }
    }
  },
  'image': {
    'normal': {
      'order': 0,
      'type': 'image',
      'option': 'normal',
      'data': {
        'content': '',
        'padding': 20,
        'url': '',

      }
    }
  },
  'paragraphWithImage': {
    'normal': {
      'order': 0,
      'type': 'paragraphWithImage',
      'option': 'normal',
      'data': {
        'content': '<p>本文</p>',
        'padding': 20,
        'shadow': 1,
        'url': ''
      }
    }
  }
}