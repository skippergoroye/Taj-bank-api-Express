import express, { Request, Response } from 'express';
import { Auth, validator } from '../middlewares/index.middleware';
import AccountController from '../controllers/account-controller';
import { container } from 'tsyringe';
import ValidationSchema from '../validator/account-validator-schema';
import AccountService from '../services/account-service';
import AccountDataSource from '../datasources/account-datasource';



const router = express.Router();
const accountService = new AccountService(new AccountDataSource())
const accountController = new AccountController(accountService)

const createAccountRoute = () => {


  router.post('/create-account', validator(ValidationSchema.createAccountSchema), Auth(), (req: Request, res: Response) => {
    return accountController.createAccount(req, res);
  });


  router.get('/account-list', Auth(), (req: Request, res: Response) => {
    return accountController.getAllUserAccounts(req, res);
  });
 

  router.get('/:id', Auth(), (req: Request, res: Response) => {
    return accountController.getUserAccount(req, res);
  });

  // router.get("/payee/list", Auth(), (req: Request, res: Response) => {
  //   return accountController.getAllUserPayee(req, res);
  // });


  // router.get("/payee/:id", Auth(), (req: Request, res: Response) => {
  //   return accountController.getUserPayee(req, res);
  // });

  // router.post("/apply-for-loan", validator(ValidationSchema.loanApplication), Auth(), (req: Request, res: Response) => {
  //   return accountController.applyLoan(req, res);
  // });

  // router.get("/loan/list", Auth(), (req: Request, res: Response) => {
  //   return accountController.getAllUserLoan(req, res);
  // });

  return router;
};

export default createAccountRoute();
