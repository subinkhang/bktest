import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customer, CustomerRelations, Transaction, Cart} from '../models';
import {TransactionRepository} from './transaction.repository';
import {CartRepository} from './cart.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof Customer.prototype.id>;

  public readonly cart: BelongsToAccessor<Cart, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>,
  ) {
    super(Customer, dataSource);
    this.cart = this.createBelongsToAccessorFor('cart', cartRepositoryGetter,);
    this.registerInclusionResolver('cart', this.cart.inclusionResolver);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
  }
}
