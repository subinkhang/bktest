import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Agency, AgencyRelations, Admin, Product, Transaction} from '../models';
import {AdminRepository} from './admin.repository';
import {ProductRepository} from './product.repository';
import {TransactionRepository} from './transaction.repository';

export class AgencyRepository extends DefaultCrudRepository<
  Agency,
  typeof Agency.prototype.id,
  AgencyRelations
> {

  public readonly products: HasManyRepositoryFactory<Product, typeof Agency.prototype.id>;

  public readonly admins: HasManyRepositoryFactory<Admin, typeof Agency.prototype.id>;
  public readonly transactions: HasManyRepositoryFactory<Transaction, typeof Agency.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AdminRepository') protected adminRepositoryGetter: Getter<AdminRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('TransactionRepository') protected transactionRepositoryGetter: Getter<TransactionRepository>,
  ) {
    super(Agency, dataSource);
    this.admins = this.createHasManyRepositoryFactoryFor('admins', adminRepositoryGetter,);
    this.registerInclusionResolver('admins', this.admins.inclusionResolver);
    this.transactions = this.createHasManyRepositoryFactoryFor('transactions', transactionRepositoryGetter,);
    this.registerInclusionResolver('transactions', this.transactions.inclusionResolver);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
