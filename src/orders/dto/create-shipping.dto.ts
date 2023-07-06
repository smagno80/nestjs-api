import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty({ message: 'Phone can not be empty.' })
  @IsString({ message: 'Phone format should be a string.' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Name format should be a string.' })
  name: string;

  @IsNotEmpty({ message: 'Address can not be empty.' })
  @IsString({ message: 'Address format should be a string.' })
  address: string;

  @IsNotEmpty({ message: 'PostCode can not be empty.' })
  @IsString({ message: 'PostCode format should be a string.' })
  postCode: string;

  @IsNotEmpty({ message: 'City can not be empty.' })
  @IsString({ message: 'City format should be a string.' })
  city: string;

  @IsNotEmpty({ message: 'State can not be empty.' })
  @IsString({ message: 'State format should be a string.' })
  state: string;

  @IsNotEmpty({ message: 'Country can not be empty.' })
  @IsString({ message: 'Country format should be a string.' })
  country: string;
}
