import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  async create(@Body() { DonoNome, NomePet, raca }: CreatePetDto) {
    return this.petService.create ({ DonoNome, NomePet, raca });
  }

  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() { DonoNome, NomePet, raca },
  ) {
    return { id, DonoNome, NomePet, raca };
  }
  @Delete('id')
  async delete(@Param('id', ParseIntPipe) id: number) {}
}
