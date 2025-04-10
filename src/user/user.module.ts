import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [],
    providers: [UserService,PrismaService],
    controllers: [UserController],
    exports:[],
})
export class UserModule {}
