import {IsAlpha, Matches , IsString} from 'class-validator';
export class CreateProdutoDto {
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'por favor, insira apenas letras e espaços',
  })
  name: string;
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'por favor, insira apenas letras e espaços',
  })
  tipo: string;

  @Matches(/^[0-9.,:\$]+$/)
  preco: string;
}
