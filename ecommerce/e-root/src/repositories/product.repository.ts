import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Product, ProductRelations, Agency, Transaction, Cart} from '../models';
import {AgencyRepository} from './agency.repository';
import {TransactionRepository} from './transaction.repository';
import {CartRepository} from './cart.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly agency: BelongsToAccessor<Agency, typeof Product.prototype.id>;

  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof Product.prototype.id>;

  public readonly carts: HasManyRepositoryFactory<Cart, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AgencyRepository') protected agencyRepositoryGetter: Getter<AgencyRepository>, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>,
  ) {
    super(Product, dataSource);
    this.carts = this.createHasManyRepositoryFactoryFor('carts', cartRepositoryGetter,);
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
    this.agency = this.createBelongsToAccessorFor('agency', agencyRepositoryGetter,);
    this.registerInclusionResolver('agency', this.agency.inclusionResolver);
  }
}
