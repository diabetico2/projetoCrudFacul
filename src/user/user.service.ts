import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
  async read() {
    return await this.prisma.user.findMany();
  }
  async readOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { email, name, password }:PatchUserDto ) {
    await this.exists(id);

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        password,
      },
    });
  }
  async exists(id: number) {
    if (!(await this.readOne(id))) {
      throw new NotFoundException('User not found');
    }
  }
  async delete (id: number) {

    await this.exists(id);
   return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
