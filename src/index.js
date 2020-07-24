/**
 * 获取限制范围内的位数
 * @param {number} digits 转换后的位数
 * @param {number} max 最大位数
 * @param {number} min 最小位数
 */
function getLimitedDigits(digits, max, min) {
  if (!digits || digits < min) {
    return min
  }
  if (digits > max) {
    return max
  }
  return digits
}

/**
 * 获取转换后的中文文本
 * @param {(number|string)} value 要转换的数字
 * @param {number} digits 转换后的位数
 */
function getTransformText(value, digits) {
  let capital = ''
  const arr = value.toString().split('.')
  // 判断是否为小数，若有，则计算小数占位数且限制最多为2位
  let decimalDigits = 0
  if (arr.length > 1) {
    decimalDigits = arr[1].length > 2 ? 2 : arr[1].length
  }
  let num = (+value).toFixed(decimalDigits).replace(/,|\./g, '')
  // 标记是否为负数
  const isNegativeNum = num.indexOf('-') > -1
  // 先暂时删除负号，之后在补上 ‘负’
  if (isNegativeNum) {
    num = num.slice(1)
  }
  const chineseNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾']
  const chineseIntUnit = [
    '万', '仟', '佰', '拾',
    '亿', '仟', '佰', '拾',
    '万', '仟', '佰', '拾',
    '元'
  ]
  const chineseDecUnit = ['角', '分']
  const chineseUnitLen = chineseIntUnit.length + chineseDecUnit.length
  // 根据小数点后的位数对 chineseUnit 进行截取
  let limitedChineseUnit = chineseIntUnit.concat(chineseDecUnit.slice(0, decimalDigits))
  // 获取限制后的位数
  const limitedDigits = getLimitedDigits(digits, chineseUnitLen, num.length)
  // 根据限制位数对 limitedChineseUnit 进行截取
  limitedChineseUnit = limitedChineseUnit.slice(limitedChineseUnit.length - limitedDigits)
  // 若有传入固定位数选项 digits，则进行高位补零
  if (digits) {
    while(limitedDigits > num.length) {
      num = '0' + num
    }
  }
  num.split('').forEach((item, index) => {
    capital += chineseNum[item] + limitedChineseUnit[index]
  })
  if (isNegativeNum) {
    capital = '负' + capital
  }
  return capital
}

/**
 * 数字-中文转换器
 * @param {(number|string)} value 转换的数字
 * @param {Object} option 选项配置
 */
function transformer(value, option = {}) {
  const digits = option.digits,
    mark = option.mark || [],
    markFunc = option.markFunc || (keyword => keyword)
  if (value === '' || value === null || Number.isNaN(Number(value))) {
    return value
  }
  let capital = getTransformText(value, digits)
  // 标记 mark 数组对应的文本
  if (Array.isArray(mark) && mark.length) {
    const regexp = new RegExp(mark.join('|'), 'g')
    capital = capital.replace(regexp, markFunc)
  }
  return capital
}

module.exports = transformer