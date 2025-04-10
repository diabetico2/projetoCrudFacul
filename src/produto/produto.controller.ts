import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';


@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() { name, tipo, preco }: CreateProdutoDto) {
    return this.produtoService.create ({ name, tipo, preco });
  }

  @Get()
  async read() {
    return [];
  }
  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() { name, tipo, preco },
  ) {
    return { id, name, tipo, preco };
  }

  @Delete(':id')
async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
