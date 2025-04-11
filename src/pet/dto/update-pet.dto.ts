import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsAlpha } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {
      @IsAlpha()
      DonoNome: string;
      @IsAlpha()
      NomePet: string;
      @IsAlpha()
      raca: string;
}
