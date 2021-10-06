import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [RegistrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
