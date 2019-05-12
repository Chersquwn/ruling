type RulingData = string | number
type Range = [number, number]

export default class Ruling {
  public value: RulingData
  public passed: boolean
  public message: string

  public constructor(value: RulingData) {
    this.value = value
    this.passed = false
    this.message = 'passed'
  }

  public data(value: RulingData) {
    this.value = value
  }

  public required(message: string): Ruling {
    if (!this.passed) return this

    if (!this.value) {
      this.message = message
      this.passed = false
    }

    return this
  }

  public minLength(length: number, message: string): Ruling {
    if (!this.passed) return this

    if (this.value.toString().length < length) {
      this.message = message
      this.passed = false
    }

    return this
  }

  public maxLength(length: number, message: string): Ruling {
    if (!this.passed) return this

    if (this.value.toString().length > length) {
      this.message = message
      this.passed = false
    }

    return this
  }

  public equals(data: RulingData, message: string): Ruling {
    if (!this.passed) return this

    if (this.value !== data) {
      this.message = message
      this.passed = false
    }

    return this
  }

  public range(range: Range, message: string): Ruling {
    if (!this.passed) return this

    if (this.value < range[0] || this.value > range[1]) {
      this.message = message
      this.passed = false
    }

    return this
  }
}
