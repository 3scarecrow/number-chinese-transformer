const transformer = require('./index')

describe('transformer', () => {
  describe('value is a positive number and', () => {
    it('integer', () => {
      expect(transformer(123456)).toBe('壹拾贰万叁仟肆佰伍拾陆元')
    })
    it('float with two decimal', () => {
      expect(transformer(123456.12)).toBe('壹拾贰万叁仟肆佰伍拾陆元壹角贰分')
    })
    it('float with more than two decimal', () => {
      expect(transformer(123456.1234)).toBe('壹拾贰万叁仟肆佰伍拾陆元壹角贰分')
    })
  })

  describe('value is a negative number and', () => {
    it('integer', () => {
      expect(transformer(-123456)).toBe('负壹拾贰万叁仟肆佰伍拾陆元')
    })
    it('float with two decimal', () => {
      expect(transformer(-123456.12)).toBe('负壹拾贰万叁仟肆佰伍拾陆元壹角贰分')
    })
    it('float with more than two decimal', () => {
      expect(transformer(-123456.1234)).toBe('负壹拾贰万叁仟肆佰伍拾陆元壹角贰分')
    })
  })

  describe('value is a string and', () => {
    it('can be transform as Number type', () => {
      expect(transformer('12.00')).toBe('壹拾贰元零角零分')
    })
    it('can not be transform as Number type', () => {
      expect(transformer('123abc')).toBe('123abc')
    })
  })

  describe('test digits property of option', () => {
    it('value of digits is within 15', () => {
      expect(transformer(123456.78, { digits: 11 }))
        .toBe('零亿零仟零佰壹拾贰万叁仟肆佰伍拾陆元柒角捌分')
    })
    it('value of digits is more than 15', () => {
      expect(transformer(123456.78, { digits: 18 }))
        .toBe('零万零仟零佰零拾零亿零仟零佰壹拾贰万叁仟肆佰伍拾陆元柒角捌分')
    })
    it('value of digits is less than length of number', () => {
      expect(transformer(3456.78, { digits: 4 })).toBe('叁仟肆佰伍拾陆元柒角捌分')
    })
  })

  describe('test mark and markFunc property of option', () => {
    it('mark is array', () => {
      expect(transformer(123456.78, { mark: ['万', '仟', '佰', '拾', '元', '角', '分'] }))
        .toBe('壹拾贰万叁仟肆佰伍拾陆元柒角捌分')
    })
    it('mark is array and markFunc is passed also', () => {
      expect(transformer(56.78, {
        mark: ['万', '仟', '佰', '拾', '元', '角', '分'],
        markFunc: (keyword) => `<i>${keyword}</i>`
      }))
        .toBe('伍<i>拾</i>陆<i>元</i>柒<i>角</i>捌<i>分</i>')
    })
  })

  describe('some special value', () => {
    it('value is null', () => {
      expect(transformer(null)).toBeNull()
    })
    it('value is empty string', () => {
      expect(transformer('')).toBe('')
    })
  })
})