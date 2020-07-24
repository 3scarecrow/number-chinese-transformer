# number-chinese-transformer

![travis-ci](https://api.travis-ci.org/3scarecrow/number-chinese-transformer.svg?branch=master&status=passed)

A tool that transform number to chinese, and provide function that mark some keywork with html

## Install

```sh
yarn add @3scarecrow/number-chinese-transformer --dev

# or

npm install @3scarecrow/number-chinese-transformer --save-dev
```

## Usage

### value

```js
import transformer from '@3scarecrow/number-chinese-transformer'

// transform integer number
transformer(123456) // -> '壹拾贰万叁仟肆佰伍拾陆元'

// transform decimal number
transformer(123456.12) // -> '壹拾贰万叁仟肆佰伍拾陆元壹角贰分'

// transform negative number
transformer(-123456) // -> '负壹拾贰万叁仟肆佰伍拾陆元'

// transform string that can be transform as number
transformer('12.00') //-> '壹拾贰元零角零分'
```

### option

Type: `Object`
Default: `{}`

option can be used as the second parameter of the transformer, option has three properties: digits, mark and markFunc.

#### `digits`

Type: `Number`
Default: `Undefined`

```js
transformer(6789.56, { digits: 11 })
// 零亿零仟零佰零拾零万陆仟柒佰捌拾玖元伍角陆分
```

#### `mark`

Type: `Array`
Default: `[]`

Those text that be included in `mark` array will be transformed by calling `markFunc`

**`mark` should be used with `markFunc`**

#### `markFunc`

Type: `Function`
Default: `keyword => keyword`

Those text that be included in `mark` array will be transformed by calling `markFunc`

```js
transformer(56.78, {
  mark: ['万', '仟', '佰', '拾', '元', '角', '分'],
  markFunc: (keyword) => `<i>${keyword}</i>`
})
// '伍<i>拾</i>陆<i>元</i>柒<i>角</i>捌<i>分</i>'
```
