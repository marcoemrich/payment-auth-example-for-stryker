export class Money {
  constructor(majorAmount, minorAmount) {
    this.majorAmount = majorAmount;
    this.minorAmount = minorAmount;
    this.currency = "EUR";
  }
  toDecimal() {
    return this.majorAmount * 10 * 10 + this.minorAmount;
  }
  compareTo(other) {
    return this.toDecimal() - other.toDecimal();
  }
}
