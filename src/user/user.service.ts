import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findEmail(email) {
    const userEmail = await this.userRepository.findOneBy({ email });

    if (!userEmail) {
      throw new HttpException('Email already exists', 400);
    }
    return userEmail;
  }

  async user(headers: any): Promise<any> {
    const authorizationHeader = headers.authorization;
    // It tries to extract the authorization header from the incoming request headers.
    // This header typically contains the token used for authentication.
    if (authorizationHeader) {
      const token = authorizationHeader.replace('Bearer', '');
      const secret = process.env.JWTSECRET;
      // checks if the authorization header exists. If not, it will skip to the else block
      // and throw an error.

      try {
        const decoded = this.jwtService.verify(token);
        let id = decoded['id'];
        // After verifying the token, the function extracts the user's id from the decoded token payload.

        let user = await this.userRepository.findOneBy({ id });

        return { id: id, name: user.name, email: user.email, role: user.role };
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    } else {
      throw new UnauthorizedException('Invalid or missing Bearer token');
    }
  }
}
