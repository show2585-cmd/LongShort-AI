import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// FSD 레이어 import 규칙: 상위 레이어만 하위 레이어를 import 할 수 있다.
// app > pages > widgets > features > entities > shared
const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
const fsdRestrictions = layers.map((layer, i) => ({
  files: [`src/${layer}/**/*.{ts,tsx}`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          ...layers.slice(0, i).map((upper) => ({
            group: [`@/${upper}`, `@/${upper}/*`],
            message: `'${layer}' 레이어는 상위 레이어 '${upper}'를 import 할 수 없습니다.`,
          })),
          // shared/app 을 제외한 슬라이스는 Public API(index.ts)로만 접근
          {
            group: ['pages', 'widgets', 'features', 'entities'].map((l) => `@/${l}/*/*`),
            message: '슬라이스 내부가 아닌 Public API(index.ts)를 통해 import 하세요.',
          },
        ],
      },
    ],
  },
}))

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  ...fsdRestrictions,
)
