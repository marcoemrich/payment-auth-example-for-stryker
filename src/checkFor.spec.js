const User = require("./User");
const Money = require("./Money");
const Payment = require("./Payment");
const { checkFor } = require("./checkFor");

describe("checkFor", () => {
  it("should not need approval if payment by initiator with limit more than amount", () => {
    const initiator = new User("Alice", new Money(100, 0));
    const paymentForMouse = new Payment(new Money(49, 39), initiator);
    const auth = checkFor(paymentForMouse);
    expect(auth.approvalNeeded).toBeFalsy();
  });

  it("should need approval by supervisor if payment by initiator with limit less than amount", () => {
    const supervisor = new User("Bob", new Money(500, 0));
    const initiator = new User("Alice", new Money(100, 0), supervisor);
    const paymentForKeyboard = new Payment(new Money(159, 99), initiator);
    const auth = checkFor(paymentForKeyboard);
    expect(auth.approvalNeeded).toBeTruthy();
    console.log(auth.primaryApprover.name);
  });

  it("should need approval by supervisor of supervisor if payment by initiator and supervisor with limit less than amount", () => {
    const supervisorOfSupervisor = new User("Mary", new Money(30_000, 0));
    const supervisor = new User(
      "Bob",
      new Money(500, 0),
      supervisorOfSupervisor
    );
    const initiator = new User("Alice", new Money(100, 0), supervisor);
    const paymentForGraphicCard = new Payment(new Money(11_487, 0), initiator);
    const auth = checkFor(paymentForGraphicCard);
    expect(auth.approvalNeeded).toBeTruthy();
    console.log(auth.primaryApprover.name);
  });
});
