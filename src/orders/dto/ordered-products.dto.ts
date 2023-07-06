import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty({ message: 'Product id can not be empty.' })
  id: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price should be a number & max decimal precission 2.' })
  @IsPositive({ message: 'Price can not be negative.' })
  product_unit_price: number;

  @IsNumber({}, { message: 'Quantity should be a number.' })
  @IsPositive({ message: 'Quantity can not be negative.' })
  product_quantity: number;
}
