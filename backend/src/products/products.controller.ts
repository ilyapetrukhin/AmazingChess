import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getAll() {
    return this.productService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string): string {
    return this.productService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreatProductDto) {
    return this.productService.create(createProductDto);
  }

  @Delete('id')
  remove(@Param('id') id: string) {
    return 'Remive' + id;
  }

  @Put(':id')
  update(@Body() updateProductDto: CreatProductDto, @Param('id') id: string) {
    return 'Update' + id;
  }
}
