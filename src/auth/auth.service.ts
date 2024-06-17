import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client'; /* TOdos os model criados no Prisma viram tipos */
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UsersService
    ) { }

    /* Agora podemos criar e gerenciar tokens */
    /* 1° Parte o Payloda */
    async createToken(user: users) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                nome: user.nome,
                email: user.email,
               
            },
                {
                    expiresIn: "7 days", /* Tempo de expiração */
                    subject: String(user.id), /* Pra quem pertence */
                    issuer: 'login', /* Quem tá imitidno o token */
                    audience: 'users', /* Para quem está sendo emitido */
                })
        }
    }

    async checkToken(token: string) {
        try {
            const secretKey = process.env.JWT_SECRET ;
           // console.log(secretKey);
            const data = await this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'login',
                secret: secretKey
            });
            return data;

        } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
        }

    }

    async login(email: string, senha: string) {
        const user = await this.prisma.users.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException("Email ou senha incorretos");
        }

        if (!await bcrypt.compare(senha, user.senha)) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        } /* Segundo argumetno é o dado que tá encriptado */
        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.prisma.users.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException("Email incorreto");
        }

        return this.createToken(user);
    }

    async isValidToken(token: string){
        try {
            await this.checkToken(token);
            return true;
        } catch (error) {
            return false;
        }
    }

    async reset(senha: string, token: string) {
        /* Implementar mais tarde */
        const id = 0;
        const user = await this.prisma.users.update({
            where: { id },
            data: { senha }
        });

        return this.createToken(user);
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }

    async me(token : string){

    }
}
