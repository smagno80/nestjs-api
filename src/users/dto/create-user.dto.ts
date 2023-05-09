import { IsNotEmpty } from 'class-validator';

import { Roles } from '../../utility/common/user-roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly roles: Roles[];
}
