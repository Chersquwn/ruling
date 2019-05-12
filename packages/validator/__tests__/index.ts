import validator from '../index'

describe('validator', () => {
  test('string', () => {
    const str = 'hello world'
    const num = 12345
    const emptyStr = ''

    expect(validator.string(str)).toBe(true)
    expect(validator.string(num)).toBe(false)
    expect(validator.string(emptyStr)).toBe(true)
  })

  test('number', () => {
    const str = 'hello world'
    const num = 12345

    expect(validator.number(str)).toBe(false)
    expect(validator.number(num)).toBe(true)
  })

  test('null', () => {
    const str = ''
    const value = null

    expect(validator.null(str)).toBe(true)
    expect(validator.null(value)).toBe(true)
  })

  test('undefined', () => {
    const str = ''
    const value1 = null
    let value2

    expect(validator.undefined(str)).toBe(false)
    expect(validator.undefined(value1)).toBe(false)
    expect(validator.undefined(value2)).toBe(true)
  })

  test('array', () => {
    const value1 = []
    const value2 = [1, 2, '3']
    const value3 = {}

    expect(validator.array(value1)).toBe(true)
    expect(validator.array(value2)).toBe(true)
    expect(validator.array(value3)).toBe(false)
  })

  test('object', () => {
    const value1 = [1, 2, '3']
    const value2 = {}
    const value3 = { a: 1, b: '2' }

    expect(validator.object(value1)).toBe(false)
    expect(validator.object(value2)).toBe(true)
    expect(validator.object(value3)).toBe(true)
  })

  test('url', () => {
    const value1 = 'file://a/b/c'
    const value2 = 'https://github.com'

    expect(validator.url(value1)).toBe(false)
    expect(validator.url(value2)).toBe(true)
  })

  test('email', () => {
    const value1 = 'abc@gmail.com'
    const value2 = '123@dsf.dsf'

    expect(validator.email(value1)).toBe(true)
    expect(validator.email(value2)).toBe(true)
  })

  test('phone', () => {
    const value1 = '12222222222'
    const value2 = '13888888888'

    expect(validator.phone(value1)).toBe(false)
    expect(validator.phone(value2)).toBe(true)
  })

  test('identity', () => {
    const value1 = '420821199206305032'
    const value2 = '489821199206305062'

    expect(validator.identity(value1)).toBe(true)
    expect(validator.identity(value2)).toBe(false)
  })

  test('creditCard', () => {
    const value1 = '6259655533117715'
    const value2 = '625965553311771'

    expect(validator.creditCard(value1)).toBe(true)
    expect(validator.creditCard(value2)).toBe(false)
  })

  test('contains', () => {
    const str = '6259655533117715'
    const value1 = '625965553311771'
    const array = [1, 2, 3, 4]
    const value2 = 4
    const object = { a: 2, b: 'x' }
    const value3 = 'a'

    expect(validator.contains(str, value1)).toBe(true)
    expect(validator.contains(array, value2)).toBe(true)
    expect(validator.contains(object, value3)).toBe(true)
  })

  test('empty', () => {
    const str = ''
    const array = []
    const object = null

    expect(validator.empty(str)).toBe(true)
    expect(validator.empty(array)).toBe(true)
    expect(validator.empty(object)).toBe(true)
  })

  test('not', () => {
    const value1 = ''
    const value2 = 0
    const value3 = 0
    const value4 = null

    expect(validator.not(value1, value2)).toBe(true)
    expect(validator.not(value2, value3)).toBe(false)
    expect(validator.not(value3, value4)).toBe(true)
  })

  test('eq', () => {
    const value1 = ''
    const value2 = 0
    const value3 = 0
    const value4 = null

    expect(validator.eq(value1, value2)).toBe(false)
    expect(validator.eq(value2, value3)).toBe(true)
    expect(validator.eq(value3, value4)).toBe(false)
  })

  test('gt', () => {
    const value1 = 22
    const value2 = 23

    expect(validator.gt(value1, value2)).toBe(false)
    expect(validator.gt(value2, value1)).toBe(true)
  })

  test('gte', () => {
    const value1 = 23
    const value2 = 23
    const value3 = 22

    expect(validator.gte(value1, value2)).toBe(true)
    expect(validator.gte(value1, value3)).toBe(true)
  })

  test('lt', () => {
    const value1 = 22
    const value2 = 23

    expect(validator.lt(value1, value2)).toBe(true)
    expect(validator.lt(value2, value1)).toBe(false)
  })

  test('lte', () => {
    const value1 = 23
    const value2 = 23
    const value3 = 22

    expect(validator.lte(value1, value2)).toBe(true)
    expect(validator.lte(value3, value1)).toBe(true)
  })
})
