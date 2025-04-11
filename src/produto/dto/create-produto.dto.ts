import {IsAlpha, Matches , IsString} from 'class-validator';
export class CreateProdutoDto {
  @IsString()
  name: string;
  @IsAlpha()
  tipo: string;

  @Matches(/^[0-9.,:\$]+$/)
  preco: string;
}
