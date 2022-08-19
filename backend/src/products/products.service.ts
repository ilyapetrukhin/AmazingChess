import { Injectable } from '@nestjs/common';
import { CreatProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products = [];

  getAll() {
    return this.products;
  }

  getById(id: string) {
    return this.products.find((p) => p.id === id);
  }

  create(productDto: CreatProductDto) {
    this.products.push({
      ...productDto,
      id: Date.now().toString(),
    });
  }
}
