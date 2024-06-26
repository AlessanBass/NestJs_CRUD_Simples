import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    const salt = await bcrypt.genSalt();
    createUserDto.senha = await bcrypt.hash(createUserDto.senha, salt);
    return this.prismaService.users.create({data:createUserDto});
  }

  async findAll() {
    return this.prismaService.users.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.users.findUnique({
      where:{
        id:id
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const now = new Date(); // Obtém a data e hora atual

    return this.prismaService.users.update({
      where:{id: id},
      data:{
        nome: updateUserDto.nome,
        email: updateUserDto.email,
        senha:updateUserDto.senha,
        role: updateUserDto.role,
        updatedAt:now
      }
    });
  }

  async remove(id: number) {
    return this.prismaService.$queryRaw`DELETE FROM users WHERE id = ${id}`;
  }
}
