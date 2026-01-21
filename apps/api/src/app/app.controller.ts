import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ContentDto } from '@libs/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Query('path') path: string): ContentDto {
    return this.appService.getContent(path);
  }
}
