import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CertHeaderStrategy } from './strategies/cert.strategy';

@Module({
  controllers: [AppController],
  providers: [
    CertHeaderStrategy,
    {
      provide: APP_GUARD,
      useClass: LocalAuthGuard,
    },
  ],
})
export class AppModule {}
