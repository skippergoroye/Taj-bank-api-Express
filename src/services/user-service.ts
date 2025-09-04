import { IFindUserQuery, IUser, IUserCreationBody } from "../interfaces/user-interface";
import UserDataSource from "../datasources/user-datasource";
import { injectable } from "tsyringe";

@injectable()
class UserService {
  constructor(private userDataSource: UserDataSource) {}

  async getUserByField(record: Partial<IUser>): Promise<IUser | null> {
    const query = { where: { ...record }, raw: true } as IFindUserQuery;
    return this.userDataSource.fetchOne(query);
  }

  async getAllUsers(): Promise<IUser[] | null> {
    const query = { where: {}, order: [["createdAt", "DESC"]], raw: true } as IFindUserQuery;
    return this.userDataSource.fetchAll(query);
  }

  async createUser(record: IUserCreationBody) {
    return this.userDataSource.create(record);
  }

  async updateRecord(searchBy: Partial<IUser>, record: Partial<IUser>): Promise<void> {
    const query = { where: { ...searchBy } } as IFindUserQuery;
    await this.userDataSource.updateOne(query, record);
  }
}

export default UserService;
