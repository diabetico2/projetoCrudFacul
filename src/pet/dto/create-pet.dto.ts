import { Matches } from 'class-validator';

export class CreatePetDto {
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'por favor, insira apenas letras e espaços',
  })
  DonoNome: string;
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'por favor, insira apenas letras e espaços',
  })
  NomePet: string;
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'por favor, insira apenas letras e espaços',
  })
  raca: string;
}
