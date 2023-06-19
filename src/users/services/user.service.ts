import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const doesUserExists = await this.checkUserAlreadyExists(
      createUserDto.email,
    );
    if (doesUserExists) {
      throw new BadRequestException('User with given email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    createUserDto.password = hashedPassword;
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    return { name: user.name, email: user.email };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new BadRequestException('User with given email does not exist');
    }

    if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = {
      name: user.name,
      email: user.email,
      user_type: user.user_type,
      address: user.address,
      phone_number: user.phone_number,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async updateUser(email: string, updateUserDto: UpdateUserDto) {
    const doesUserExists = await this.checkUserAlreadyExists(email);
    if (doesUserExists) {
      throw new BadRequestException('Given user does not exist');
    }
    return await this.userRepository.update({ email }, updateUserDto);
  }

  public async deleteUser(email: string, _accessToken: string) {
    return await this.userRepository.delete({ email });
  }
  public async checkUserAlreadyExists(email) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user ? true : false;
  }
}
