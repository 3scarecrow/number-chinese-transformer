import buble from '@rollup/plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

const version = process.env.VERSION || require('./package.json').version

const banner = [
  '/**\n',
  ' * @preserve\n',
  ` * @3scarecrow/number-chinese-transformer v${version}\n`,
  ' */'
].join('')

export default [
  {
    input: './src/index.js',
    output: {
      file: 'dist/number-chinese-transformer.common.js',
      format: 'cjs',
      banner
    },
    plugins: [buble()]
  },
  {
    input: './src/index.js',
    output: {
      file: 'dist/number-chinese-transformer.umd.js',
      format: 'umd',
      name: 'number-chinese-transformer',
      banner
    },
    plugins: [buble(), uglify()]
  }
]