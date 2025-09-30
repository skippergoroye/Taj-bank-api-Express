import { autoInjectable } from "tsyringe";
import { TransactionGateWay, TransactionStatus, TransactionTypes } from "../interfaces/enum/transaction-enum";
import { IFindTransactionQuery, ITransaction, ITransactionCreationBody, ITransactionDataSource } from "../interfaces/transaction-interface";
import { v4 as uuidv4 } from "uuid";
import TransactionDataSource from "../datasources/transaction-datasource";


@autoInjectable()
class TransactionService {
  private transactionDataSource: TransactionDataSource;

  constructor(_transactionDataSource: TransactionDataSource) {
    this.transactionDataSource = _transactionDataSource;
  }


  async fetchTransactionByReference(reference: string): Promise<ITransaction | null> {
    const query = {
      where: { reference },
      raw: true,
    };
    return this.transactionDataSource.fetchOne(query);
  }


    async setStatus(transactionId:string , status  :string , options: Partial<IFindTransactionQuery> = {}): Promise<void> {
    const filter = {where : {id:transactionId },...options};
    const update = {
      status 
    }
    await this.transactionDataSource.updateOne( update, filter);
  }



  async depositByPaystack(data: Partial<ITransaction>): Promise<ITransaction> {

    const deposit = {
      ...data,
      type: TransactionTypes.DEPOSIT,
      detail: {
        ...data.detail,
        gateway: TransactionGateWay.PAYSTACK
      },
      status: TransactionStatus.IN_PROGRESS
    } as ITransactionCreationBody;
    return this.transactionDataSource.create(deposit)
  }


}

export default TransactionService;


