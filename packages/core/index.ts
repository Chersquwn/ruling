import validator from '@ruling/validator'

type RulingData = string | number
type Range = [number, number]
type Callback = (ctx: Ruling) => void

export default class Ruling {
  public value: RulingData
  public passed: boolean
  public message: string

  public constructor(value?: RulingData) {
    this.value = value
    this.passed = true
    this.message = 'passed'
  }

  public data(value: RulingData) {
    this.value = value

    return this
  }

  public required(message: string, callback?: Callback) {
    if (!this.passed) return this

    if (!this.value) {
      this.message = message
      this.passed = false
    }

    callback && callback(this)

    return this
  }

  public minLength(length: number, message: string, callback?: Callback) {
    if (!this.passed) return this

    if (validator.lt(this.value.toString().length, length)) {
      this.message = message
      this.passed = false
    }

    callback && callback(this)

    return this
  }

  public maxLength(length: number, message: string, callback?: Callback) {
    if (!this.passed) return this

    if (validator.gt(this.value.toString().length, length)) {
      this.message = message
      this.passed = false
    }

    callback && callback(this)

    return this
  }

  public equals(data: RulingData, message: string, callback?: Callback) {
    if (!this.passed) return this

    if (validator.not(this.value, data)) {
      this.message = message
      this.passed = false
    }

    callback && callback(this)

    return this
  }

  public range(range: Range, message: string, callback?: Callback) {
    if (!this.passed) return this

    if (
      validator.lt(this.value, range[0]) ||
      validator.gt(this.value, range[1])
    ) {
      this.message = message
      this.passed = false
    }

    callback && callback(this)

    return this
  }

  public regexp(reg: RegExp, message: string, callback?: Callback) {
    if (!this.passed) return this

    if (!reg.test(this.value.toString())) {
      this.message = message
      this.passed = false
    }

    callback && callback(this)

    return this
  }
}
