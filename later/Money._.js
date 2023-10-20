const Money = require("./Money");

describe("Money.toDecimal()", () => {
  it("should convert the minor and major amount to a decimal", () => {
    const moneyValue = new Money(50, 20);
    expect(moneyValue.toDecimal()).toEqual(5020);
  });
});
