import { PaymentAuth } from "./PaymentAuth";

export const primaryApprover = (initiator, amount) => {
  let supervisor = initiator.supervisor;
  let limit = supervisor.limit;
  const maxIterations = 10; // preventing infinite loops
  for (let i = 0; i < maxIterations; i++) {
    if (amount.compareTo(limit) > 0) {
      supervisor = supervisor.supervisor;
      limit = supervisor.limit;
    }
  }
  return supervisor;
};

export const checkFor = (payment) => {
  const paymentAuth = new PaymentAuth();
  const initiator = payment.initiator;
  const amount = payment.amount;
  const limit = initiator.limit;
  if (amount.compareTo(limit) <= 0) {
    paymentAuth.approvalNeeded = false;
  }
  if (amount.compareTo(limit) > 0) {
    paymentAuth.approvalNeeded = true;
    const approver = primaryApprover(initiator, amount);
    paymentAuth.primaryApprover = approver;
  }
  return paymentAuth;
};
