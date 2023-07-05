import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(body: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(body.email);
    if (userExists) throw new BadRequestException('Email is not available.');

    body.password = await hash(body.password, 10);
    let user = this.usersRepository.create(body);
    console.log(user);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(body: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: body.email })
      .getOne();
    if (!userExists) throw new BadRequestException('Bad credentials. *');
    const matchPassword = await compare(body.password, userExists.password);
    if (!matchPassword) throw new BadRequestException('Bad credentials. **');
    delete userExists.password;
    return userExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ email });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });
  }

  //   async findOneFilter(filter: { where: { id?: string; username?: string; email?: string } }): Promise<UserEntity> {
  //     return await this.usersRepository.findOne({ ...filter });
  //   }

  //   async createFilter(createUserDto: CreateUserDto): Promise<UserEntity | { warningMessage: string }> {
  //     const user = new UserEntity();

  //     const existingByUsername = await this.findOneFilter({ where: { username: createUserDto.username } });

  //     const existingByEmail = await this.findOneFilter({ where: { email: createUserDto.email } });

  //     if (existingByUsername) {
  //       return { warningMessage: 'Username is not available.' };
  //     }

  //     if (existingByEmail) {
  //       return { warningMessage: 'Email is not available.' };
  //     }

  //     const hashedPassword = await hash(createUserDto.password, 10);

  //     user.name = createUserDto.name;
  //     user.username = createUserDto.username;
  //     user.email = createUserDto.email;
  //     user.password = hashedPassword;

  //     let data = this.usersRepository.create(user);
  //     data = await this.usersRepository.save(data);
  //     delete data.password;
  //     return data;
  //   }
}
