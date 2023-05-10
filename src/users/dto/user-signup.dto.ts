import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Roles } from '../../utility/common/user-roles.enum';
import { UserSignInDto } from './user-signin.dto';

export class UserSignUpDto extends UserSignInDto {
  @IsNotEmpty({ message: 'Name can not be null.' })
  @IsString({ message: 'Name should be string.' })
  name: string;

  @IsNotEmpty({ message: 'Username can not be null.' })
  @IsString({ message: 'Username should be string.' })
  username: string;

  @IsArray({ message: 'Roles should be array.' })
  @IsEnum(Roles, { each: true })
  roles: Roles[];
}
