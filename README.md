# number-chinese-transformer

A tool that transform number to chinese, and provide function that mark some keywork with html

## Install

```sh
# yarn

```

## Usage

### number

转换的数字

### option

转换的选项配置对象

- digits: 若需要将转换后的数字填充为固定位数，可传入该值。默认根据 number 参数位数转换为对应位数

```js
transformer(6789.56)
// 伍万陆仟柒佰捌拾玖元伍角陆分
transformer(6789.56, { digits: 11 })
// 零亿零仟零佰零拾零万陆仟柒佰捌拾玖元伍角陆分
```
