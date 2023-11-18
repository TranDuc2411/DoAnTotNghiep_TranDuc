import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CartProductDto } from './cart-product.dto';

@Controller('cart-product')
export class CartProductController {
  constructor(private readonly cartProductService: CartProductService) {}

  @Post('add')
  async addProductToCart(
    @Body() cartProductDto: CartProductDto,
    @Request() request: any,
  ) {
    try {
      const userId = request.user.userId;
      const cartProductDtoWithUserId = { ...cartProductDto, userid: userId };
      console.log(cartProductDtoWithUserId);
      return await this.cartProductService.addProductToCart(
        cartProductDtoWithUserId,
      );
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getall')
  async getAllProductsInCart(@Request() req: any) {
    const userId = req.user.userId;
    try {
      return await this.cartProductService.getAllProductsInCart(userId);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('remove/:productId')
  async removeProductFromCart(@Param('productId') productId: number) {
    try {
      return await this.cartProductService.removeProductFromCart(productId);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('remove-all')
  async removeAllProductsFromCart(@Request() req: any) {
    const userId = req.user.userId;
    try {
      return await this.cartProductService.removeAllProductsFromCart(userId);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
