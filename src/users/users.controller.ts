import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

 
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

 
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

 
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
