import validator from '@ruling/validator'

type RulingData = string | number
type Range = [number, number]

export default class Ruling {
  public value: RulingData
  public passed: boolean
  public message: string

  public constructor(value?: RulingData) {
    this.value = value
    this.passed = true
    this.message = 'passed'
  }

  public next(): Promise<Ruling> {
    return Promise.resolve(this)
  }

  public break(): Promise<Ruling> {
    return Promise.reject(this)
  }

  public data(value: RulingData): Promise<Ruling> {
    this.value = value

    return this.next()
  }

  public required(message: string): Promise<Ruling> {
    if (!this.passed) return this.break()

    if (validator.empty(this.value)) {
      this.message = message
      this.passed = false
    }

    return this.next()
  }

  public minLength(length: number, message: string): Promise<Ruling> {
    if (!this.passed) return this.break()

    if (validator.lt(this.value.toString().length, length)) {
      this.message = message
      this.passed = false
    }

    return this.next()
  }

  public maxLength(length: number, message: string): Promise<Ruling> {
    if (!this.passed) return this.break()

    if (validator.gt(this.value.toString().length, length)) {
      this.message = message
      this.passed = false
    }

    return this.next()
  }

  public equals(data: RulingData, message: string): Promise<Ruling> {
    if (!this.passed) return this.break()

    if (validator.not(this.value, data)) {
      this.message = message
      this.passed = false
    }

    return this.next()
  }

  public range(range: Range, message: string): Promise<Ruling> {
    if (!this.passed) return this.break()

    if (validator.lt(this.value, range[0]) || validator.gt(this.value, range[1])) {
      this.message = message
      this.passed = false
    }

    return this.next()
  }
}
