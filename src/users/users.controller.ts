import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { AuthorizeRoles } from '../utility/decorators/authorize-roles.decorator';
import { Roles } from '../utility/common/user-roles.enum';
import { CurrentUser } from '../utility/decorators/current-user.decorator';
import { AuthenticationGuard } from '../utility/guards/authentication.guard';
import { AuthorizeGuard } from '../utility/guards/authorization.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'aplication/json')
  async signup(@Body() body: UserSignUpDto): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signup(body) };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: UserSignInDto): Promise<{ accessToken: string; user: UserEntity }> {
    const user = await this.usersService.signin(body);
    const accessToken = await this.usersService.accessToken(user);

    return { accessToken, user };
  }

  //   @Post('/signup/filter')
  //   @HttpCode(HttpStatus.CREATED)
  //   @Header('Content-type', 'aplication/json')
  //   create(@Body() createUserDto: CreateUserDto) {
  //     return this.usersService.createFilter(createUserDto);
  //   }

  // @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }
}
