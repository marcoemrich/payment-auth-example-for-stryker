export class Money {
  constructor(majorAmount, minorAmount) {
    this.majorAmount = majorAmount;
    this.minorAmount = minorAmount;
    // Stryker disable all
    this.currency = "EUR";
  }
  // Stryker restore all
  toDecimal() {
    return this.majorAmount * 10 * 10 + this.minorAmount;
  }
  compareTo(other) {
    return this.toDecimal() - other.toDecimal();
  }
}
