export interface Validator {
  string(arg: any): boolean
  number(arg: any): boolean
  null(arg: any): boolean
  undefined(arg: any): boolean
  array(arg: any): boolean
  object(arg: any): boolean

  url(arg: string): boolean
  email(arg: string): boolean
  phone(arg: string): boolean
  identity(arg: string): boolean
  creditCard(arg: string): boolean

  contains<T, U extends string | number | any[] | object>(arg: T, value: U): boolean
  empty(arg: any): boolean
  not(arg1: any, arg2: any): boolean
  eq(arg1: any, arg2: any): boolean
  gt<T extends string | number | Date>(arg1: T, arg2: T): boolean
  gte<T extends string | number | Date>(arg1: T, arg2: T): boolean
  lt<T extends string | number | Date>(arg1: T, arg2: T): boolean
  lte<T extends string | number | Date>(arg1: T, arg2: T): boolean
}

const validator: Validator = {
  string: (arg: any): boolean => typeof arg === 'string',

  number: (arg: any): boolean => typeof arg === 'number',

  null: (arg: any): boolean => !arg && typeof arg !== 'undefined' && arg !== 0,

  undefined: (arg: any): boolean => typeof arg === 'undefined',

  array: (arg: any): boolean => Array.isArray(arg),

  object: (arg: any): boolean =>
    typeof arg === 'object' &&
    Object.prototype.toString.call(arg) === '[object Object]',

  url: (url: string): boolean =>
    /(http|ftp|https|ws|wss):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/.test(
      url
    ),

  email: (email: string): boolean =>
    /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
      email
    ),

  phone: (phone: string): boolean =>
    /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
      phone
    ),

  identity: (id: string): boolean => {
    if (id.length !== 18) return false

    const cityNo: any = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    const province = id.substr(0, 2)

    if (!cityNo[province]) return false

    const regexp = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
    const match = id.match(regexp)
    const year = Number(match[2])
    const month = Number(match[3])
    const date = Number(match[4])
    const birthday = new Date(year, month - 1, date)
    const isValidBirthday =
      birthday.getFullYear() === year &&
      birthday.getMonth() + 1 === month &&
      birthday.getDate() === date

    if (!isValidBirthday) return false

    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let cardTemp: number = 0
    let valnum: string

    for (let i = 0; i < 17; i++) {
      cardTemp += Number(id.substr(i, 1)) * arrInt[i]
    }

    valnum = arrCh[cardTemp % 11]

    if (valnum !== id.substr(17, 1).toLocaleUpperCase()) return false

    return true
  },

  creditCard: (card: string): boolean => {
    if (
      !/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/.test(
        card
      )
    )
      return false

    let sum = 0
    let digit
    let tmpNum
    let shouldDouble

    for (let i = card.length - 1; i >= 0; i--) {
      digit = card.substr(i, 1)
      tmpNum = Number(digit)
      if (shouldDouble) {
        tmpNum *= 2
        if (tmpNum >= 10) {
          sum += (tmpNum % 10) + 1
        } else {
          sum += tmpNum
        }
      } else {
        sum += tmpNum
      }
      shouldDouble = !shouldDouble
    }

    return !!(sum % 10 === 0 ? card : false)
  },

  contains: <T, U extends string | number | any[] | object>(arg: T, value: U): boolean => {
    if (typeof arg === 'string' && typeof value === 'string') {
      return arg.includes(value)
    }

    if (Array.isArray(arg)) {
      return arg.includes(value)
    }

    if (validator.object(arg) && typeof value === 'string') {
      return Object.keys(arg).includes(value)
    }
  },

  empty: (arg: any): boolean => {
    if (validator.string(arg)) return arg === ''
    if (validator.array(arg)) return arg.length === 0
    if (validator.object(arg)) return Object.keys(arg).length === 0
    if (validator.undefined(arg) || validator.null(arg)) return true
    return false
  },

  not: (arg1: any, arg2: any): boolean =>
    arg1 !== arg2,

  eq: (arg1: any, arg2: any): boolean =>
    arg1 === arg2,

  gt: <T extends string | number | Date>(arg1: T, arg2: T): boolean => +arg1 > +arg2,

  gte: <T extends string | number | Date>(arg1: T, arg2: T): boolean => +arg1 >= +arg2,

  lt: <T extends string | number | Date>(arg1: T, arg2: T): boolean => +arg1 < +arg2,

  lte: <T extends string | number | Date>(arg1: T, arg2: T): boolean => +arg1 <= +arg2
}

export default validator
