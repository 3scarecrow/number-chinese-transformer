/**
 * @preserve
 * @3scarecrow/number-chinese-transformer v1.0.0
 */
'use strict';

function getLimitedDigits(digits, max, min) {
  if (!digits || digits < min) {
    return min
  }
  if (digits > max) {
    return max
  }
  return digits
}

function getAfterTransformText(number, digits) {
  var capital = '';
  var arr = number.toString().split('.');
  // 判断是否为小数，若有，则计算小数占位数且限制最多为2位
  var decimalDigits = 0;
  if (arr.length > 1) {
    decimalDigits = arr[1].length > 2 ? 2 : arr[1].length;
  }
  var num = number.toFixed(decimalDigits).replace(/,|\./g, '');
  // 标记是否为负数
  var isNegativeNum = num.indexOf('-') > -1;
  // 先暂时删除负号，之后在补上 ‘负’
  if (isNegativeNum) {
    num = num.slice(1);
  }
  var chineseNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'];
  var chineseUnit = [
    '万', '仟', '佰', '拾',
    '亿', '仟', '佰', '拾',
    '万', '仟', '佰', '拾',
    '元', '角', '分'
  ];
  var chineseUnitLen = chineseUnit.length;
  // 获取限制后位数
  var limitedDigits = getLimitedDigits(digits, chineseUnitLen, num.length);
  // 根据小数位数对 chineseUnit 进行截取
  var limitedChineseUnit = chineseUnit.slice(0, chineseUnitLen - (2 - decimalDigits));
  // 根据限制位数对 limitedChineseUnit 进行截取
  limitedChineseUnit = limitedChineseUnit.slice(limitedChineseUnit.length - limitedDigits);
  // 若有传入固定位数，则进行高位补零
  if (digits) {
    while(limitedDigits > num.length) {
      num = '0' + num;
    }
  }
  num.split('').forEach(function (item, index) {
    capital += chineseNum[item] + limitedChineseUnit[index];
  });
  if (isNegativeNum) {
    capital = '负' + capital;
  }
  return capital
}

function transformer(number, option) {
  if ( option === void 0 ) option = {};

  var digits = option.digits,
    mark = option.mark || [],
    markFunc = option.markFunc || (function (keyword) { return keyword; });
  if (number === '' || number === null || Number.isNaN(Number(number))) {
    return number
  }
  var capital = getAfterTransformText(number, digits);
  // 标记 mark 数组对应的文本
  if (Array.isArray(mark) && mark.length) {
    var regexp = new RegExp(mark.join('|'), 'g');
    capital = capital.replace(regexp, markFunc);
  }
  return capital
}

module.exports = transformer;
