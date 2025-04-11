import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ DonoNome, NomePet, raca }: CreatePetDto) {
    return await this.prisma.pet.create({
      data: {
        DonoNome,
        NomePet,
        raca,
      },
    });
  }

  async read() {
    return await this.prisma.pet.findMany();
  }

  async readOne(id: number) {
    return await this.prisma.pet.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { DonoNome, NomePet, raca }) {
   await this.exists(id);
    return await this.prisma.pet.update({
      where: {
        id,
      },
      data: {
        DonoNome,
        NomePet,
        raca,
      },
    });
  }
  async exists(id: number) {
    if (!(await this.readOne(id))) {
      throw new NotFoundException('User not found');
    }
  }
async delete(id: number) {
    await this.exists(id);
   return this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
