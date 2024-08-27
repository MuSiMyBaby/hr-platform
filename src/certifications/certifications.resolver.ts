import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CertificationsService } from './certifications.service';
import { CreateCertificationInput } from './dto/create-certification.input';
import { UpdateCertificationInput } from './dto/update-certification.input';

@Resolver('Certification')
export class CertificationsResolver {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Mutation('createCertification')
  create(@Args('createCertificationInput') createCertificationInput: CreateCertificationInput) {
    return this.certificationsService.create(createCertificationInput);
  }

  @Query('certifications')
  findAll() {
    return this.certificationsService.findAll();
  }

  @Query('certification')
  findOne(@Args('id') id: number) {
    return this.certificationsService.findOne(id);
  }

  @Mutation('updateCertification')
  update(@Args('updateCertificationInput') updateCertificationInput: UpdateCertificationInput) {
    return this.certificationsService.update(updateCertificationInput.id, updateCertificationInput);
  }

  @Mutation('removeCertification')
  remove(@Args('id') id: number) {
    return this.certificationsService.remove(id);
  }
}
