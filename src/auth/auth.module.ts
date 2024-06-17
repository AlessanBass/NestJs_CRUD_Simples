import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[JwtModule.register({
    secret: "7gr_%(Zgh!&oR8Og@:5t8s6yHGS3RC"
  }), UsersModule, PrismaModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
