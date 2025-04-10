import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all produto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: PatchProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
