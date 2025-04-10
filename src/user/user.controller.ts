import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices:UserService){ }
  @Post()
  async create(@Body() { email, name, password }: CreateUserDto) {
    return this.userServices.create ( { email, name, password });
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
    @Body() { email, name, password },
  ) {
    return { id, email, name, password };
  }
  @Delete('id')
  async delete(@Param('id', ParseIntPipe) id: number) {}
}
