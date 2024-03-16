import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  setHello(): string{
    return 'Entrei aqui no post'
  }

  /* @Post(':id')
  setHello2(@Param('id') id: string): string{
    return `Valo: ${id}`
  } */
}
