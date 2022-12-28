import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CertHeaderStrategy } from './cert.strategy';

@Module({
  controllers: [AppController],
  providers: [CertHeaderStrategy],
})
export class AppModule {}
