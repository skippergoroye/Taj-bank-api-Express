import { Request, Response } from "express";
import Utility from "../utils/index.utils";
import { ResponseCode } from "../interfaces/enum/code-enum";
import AccountService from "../services/account-service";
// import PaymentService from "../services/payment-service";
// import TransactionService from '../services/transaction-service';
import { TransactionGateWay, TransactionStatus } from "../interfaces/enum/transaction-enum";
import sequelize from "../database";
import { IAccount } from "../interfaces/account-interface";
import { ITransaction } from "../interfaces/transaction-interface";
// import PayeeService from "../services/payee-service";
import { autoInjectable } from "tsyringe";
import PaymentService from "../services/payment-service";
import TransactionService from "../services/transaction-service";
// import Permissions from "../permission";

@autoInjectable()
class TransactionController {
  private transactionService: TransactionService;
  private accountService: AccountService;
  //   private payeeService: PayeeService;

  constructor(_transactionService: TransactionService, _accountService: AccountService) {
    this.transactionService = _transactionService;
    this.accountService = _accountService;
  }


  async initiatePaystackDeposit(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const depositInfo = await PaymentService.generatePaystackPaymentUrl(params.user.email, params.amount);
      if (!depositInfo) {
        return Utility.handleError(
          res,
          "Paystack payment not available , try again in few seconds",
          ResponseCode.NOT_FOUND
        );
      }
      const newTransaction = {
        userId: params.user.id,
        accountId: params.accountId,
        amount: params.amount,
        reference: depositInfo.reference,
        detail: {},
      };
      let deposit = await this.transactionService.depositByPaystack(newTransaction);
      return Utility.handleSuccess(
        res,
        "Transaction created successfully",
        { transaction: deposit, url: depositInfo.authorization_url },
        ResponseCode.SUCCESS
      );
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }
}

export default TransactionController;
