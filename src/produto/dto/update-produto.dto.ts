import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto';
import { IsAlpha, IsNumberString, Matches } from 'class-validator';

export class PatchProdutoDto extends PartialType(CreateProdutoDto) {
  @Matches(/^[0-9.,:\$]+$/)
  preco;
  @IsAlpha()
  tipo: string;
}
