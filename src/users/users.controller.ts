import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { CurrentUser } from '../utility/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
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

  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }
}
