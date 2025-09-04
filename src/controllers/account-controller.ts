import { Request, Response } from "express";
import Utility from "../utils/index.utils";
import { ILoan } from "../interfaces/loan-interface";
import AccountService from "../services/account-service";
import { ResponseCode } from "../interfaces/enum/code-enum";
import { autoInjectable } from "tsyringe";


@autoInjectable()
class AccountController {
  private accountService: AccountService;
  // private payeeService: PayeeService;
  // private loanService: LoanService;
  // private transactionService: TransactionService;
  
  constructor(_accountService: AccountService) {
    this.accountService = _accountService;
    // this.payeeService = _payeeService;
    // this.loanService = _loanService;
    // this.transactionService = _transactionService
  }

  async createAccount(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const newAccount = {
        userId: params.user.id,
        type: params.type,
      };

      let account = await this.accountService.createAccount(newAccount);
      return Utility.handleSuccess(res, "Account created successfully", { account }, ResponseCode.SUCCESS);
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }


}

export default AccountController;
