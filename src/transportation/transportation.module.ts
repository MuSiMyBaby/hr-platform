import { Module } from '@nestjs/common';
import { TransportationService } from './transportation.service';
import { TransportationResolver } from './transportation.resolver';

@Module({
  providers: [TransportationResolver, TransportationService],
})
export class TransportationModule {}
