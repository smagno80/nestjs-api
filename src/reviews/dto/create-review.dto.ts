import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Product id should not be empty.' })
  @IsNumber({}, { message: 'Product id should be number.' })
  productId: number;

  @IsNotEmpty({ message: 'Ratings should not be empty.' })
  @IsNumber({}, { message: 'Ratings should be number.' })
  ratings: number;

  @IsNotEmpty({ message: 'Comment should not be empty.' })
  comment: string;
}
