import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CartProduct } from './cart-product.entity';
import { CartProductDto } from './cart-product.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
  ) {}

  async addProductToCart(cartProductDto: CartProductDto): Promise<CartProduct> {
    if (!cartProductDto.userid) {
      throw new BadRequestException('userId is required in cartProductDto');
    }

    const cartProduct = this.cartProductRepository.create(cartProductDto);
    const savedCartProduct = await this.cartProductRepository.save(cartProduct);

    return savedCartProduct;
  }

  async getAllProductsInCart(userId: number): Promise<CartProduct[]> {
    const cartProducts = await this.cartProductRepository.find({
      where: { userid: userId },
    });

    return cartProducts;
  }

  async removeProductFromCart(productId: number): Promise<{ message: string }> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: { productid: productId },
    });

    if (!cartProduct) {
      throw new NotFoundException(
        `Cart product with ID ${productId} not found`,
      );
    }

    await this.cartProductRepository.remove(cartProduct);

    return {
      message: `Product with ID ${productId} successfully removed from the cart.`,
    };
  }

  async removeAllProductsFromCart(userId: number): Promise<void> {
    const deleteResult: DeleteResult = await this.cartProductRepository.delete({
      userid: userId,
    });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(
        `No cart products found for user with ID ${userId}`,
      );
    }
  }
}
