import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { PatchProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ name, tipo, preco }: CreateProdutoDto) {
    return await this.prisma.produto.create({
      data: {
        name,
        tipo,
        preco,
      },
    });
  }

  async read() {
    return await this.prisma.produto.findMany()
  }

async readOne(id: number) {
    return await this.prisma.produto.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { name, tipo, preco }: PatchProdutoDto) {
   await this.exists(id);
    return await this.prisma.produto.update({
      where: {
        id,
      },
      data: {
        name,
        tipo,
        preco,
      },
    });
  }
  async exists(id: number) {
    if(!(await this.readOne(id))) {
      throw new NotFoundException('User not found');
    }
  }
async delete (id: number) {
    await this.exists(id);
   return this.prisma.produto.delete({
      where: {
        id,
      },
    });
  }
}
