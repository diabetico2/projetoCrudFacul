import { IsAlpha } from "class-validator";

export class CreatePetDto {
  @IsAlpha()
  DonoNome: string;
  @IsAlpha()
  NomePet: string;
  @IsAlpha()
  raca: string;
}
