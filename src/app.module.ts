import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [UserModule, PetModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
