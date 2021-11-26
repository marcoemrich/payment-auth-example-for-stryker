import { User } from "./User";
import { Money } from "./Money";
import { Payment } from "./Payment";
import { checkFor } from "./checkFor";

describe("checkFor", () => {
  it("should not need approval if payment by initiator with limit more than amount", () => {
    const initiator = new User("dave", new Money(200, 0));
    const payment = new Payment(new Money(123, 45), initiator);
    const auth = checkFor(payment);
    expect(auth.approvalNeeded).toBeFalsy();
  });

  it("should need approval by supervisor if payment by initiator with limit less than amount", () => {
    const supervisor = new User("liz", new Money(200, 0));
    const initiator = new User("dave", new Money(100, 0), supervisor);
    const payment = new Payment(new Money(123, 45), initiator);
    const auth = checkFor(payment);
    expect(auth.approvalNeeded).toBeTruthy();
    console.log(auth.primaryApprover.name);
  });

  it("should need approval by supervisor of supervisor if payment by initiator and supervisor with limit less than amount", function () {
    const supervisorOfSupervisor = new User("mary", new Money(200, 0));
    const supervisor = new User(
      "liz",
      new Money(100, 0),
      supervisorOfSupervisor
    );
    const initiator = new User("dave", new Money(50, 0), supervisor);
    const payment = new Payment(new Money(123, 45), initiator);
    const auth = checkFor(payment);
    expect(auth.approvalNeeded).toBeTruthy();
    console.log(auth.primaryApprover.name);
  });
});
