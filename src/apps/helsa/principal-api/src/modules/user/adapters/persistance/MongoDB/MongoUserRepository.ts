import { User, UserRepository } from "@helsa/modules";
import { MongoConnection, MongoRepository } from "@shared/adapters-server";
import { Criteria, Logger, Primitives, Uuid } from "@shared/core";


export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(User, connection, logger);
  }

  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 }, { unique: true });
  }

  async save(id: Uuid, aggregate: User): Promise<void> {
    await this.persist(id.value, aggregate);
  }
  async getUserByCriteria(criteria: Criteria): Promise<User> {
    const { filter } = this.converter.criteria(criteria);
    const user = await this.collection.findOne<Primitives<User>>(filter);
    return user ? User.fromPrimitives(user) : null;
  }

  async listUsersByCriteria(criteria?: Criteria): Promise<User[]> {
    const users = await this.searchByCriteria(criteria);
    return users.map((user) => User.fromPrimitives(user));
  }
}
