// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Client, expect} from '@loopback/testlab';
import { EcommerceApplication } from '../../application';
import {CartRepository} from '../../repositories';
import {
  CustomerWithPassword,
  Cart,
  ShoppingCartItem,
  User,
} from '../../models';
import {setupApplication} from './helper';
import {UserManagementService} from '../../services';

describe('CartController', () => {
  let app: EcommerceApplication;
  let client: Client;
  let cartRepo: CartRepository;
  let userManagementService: UserManagementService;

  const userData = {
    email: '',
    firstName: 'John',
    roles: ['customer'],
  };

  const userPassword = 'p4ssw0rd';

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    cartRepo = await app.get('repositories.CartRepository');
    userManagementService = await app.get('services.user.service');
  });
  after(async () => {
    await app.stop();
  });
  beforeEach(clearDatabase);

  it('protects shopping cart with authorization', async () => {
    const cart = givenCart();
    await client
      .post(`/carts/${cart.userId}`)
      .set('Content-Type', 'application/json')
      .send(cart)
      .expect(401);
  });

  it('sets a shopping cart for a user', async () => {
    userData.email = 'userA@loopback.io';
    const user = await givenAUser();
    const token = await authenticateUser(user);
    const cart = givenCart(user.id);
    await client
      .post(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(cart)
      .expect(204);
  });

  it('throws error if userId does not match the cart', async () => {
    userData.email = 'userB@loopback.io';
    const user = await givenAUser();
    const token = await authenticateUser(user);
    const cart = givenCart(user.id);
    await client
      .post('/carts/non-existant-id')
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .send(cart)
      .expect(403);
  });

  it('returns a shopping cart', async () => {
    userData.email = 'userC@loopback.io';
    const user = await givenAUser();
    const token = await authenticateUser(user);
    const cart = givenCart(user.id);
    await client
      .get(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(404);
    await client
      .post(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(cart)
      .expect(204);
    await client
      .get(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200, cart.toJSON());
  });

  it('deletes a shopping cart', async () => {
    userData.email = 'userD@loopback.io';
    const user = await givenAUser();
    const token = await authenticateUser(user);
    const cart = givenCart(user.id);
    // Set the shopping cart
    await client
      .post(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(cart)
      .expect(204);
    // Now we can see it
    await client
      .get(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200, cart.toJSON());
    // Delete the shopping cart
    await client
      .del(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204);
    // Now it's gone
    await client
      .get(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(404);
  });

  it('adds a shopping cart item', async () => {
    userData.email = 'userE@loopback.io';
    const user = await givenAUser();
    const token = await authenticateUser(user);
    const cart = givenCart(user.id);
    const newItem = givenAnItem();
    // Set the shopping cart
    await client
      .post(`/carts/${cart.userId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(cart)
      .expect(204);
    // Now we can see it
    await client
      .post(`/carts/${cart.userId}/items`)
      .set('Authorization', 'Bearer ' + token)
      .send(newItem)
      .expect(200);
    const newCart = (
      await client
        .get(`/carts/${cart.userId}`)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
    ).body;
    expect(newCart.items).to.containEql(newItem.toJSON());
  });

  async function clearDatabase() {
    await cartRepo.deleteAll();
  }

  function givenAnItem(item?: Partial<CartItem>) {
    return new CartItem(
      Object.assign(
        {
          productId: '0',
          name: 'iPhone XS',
          quantity: 2,
          price: 2000,
        },
        item,
      ),
    );
  }

  function givenCart(userId = '0') {
    return new Cart({
      userId: userId,
      items: [givenAnItem()],
    });
  }

  async function givenAUser() {
    const userWithPassword = new UserWithPassword(userData);
    userWithPassword.password = userPassword;
    return userManagementService.createUser(userWithPassword);
  }

  async function authenticateUser(user: User) {
    const res = await client
      .post('/users/login')
      .send({email: user.email, password: userPassword});
    return res.body.token;
  }
});
