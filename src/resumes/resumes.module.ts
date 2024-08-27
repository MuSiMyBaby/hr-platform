import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { ResumesResolver } from './resumes.resolver';

@Module({
  providers: [ResumesService, ResumesResolver],
  controllers: [ResumesController]
})
export class ResumesModule {}
