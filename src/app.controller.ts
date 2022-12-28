import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get()
  @UseGuards(AuthGuard('cert-header'))
  getHello(): string {
    return 'success';
  }
}
