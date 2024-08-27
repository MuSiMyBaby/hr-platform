import { Module } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { JobTypeResolver } from './job-type.resolver';

@Module({
  providers: [JobTypeResolver, JobTypeService],
})
export class JobTypeModule {}
