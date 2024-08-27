import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransportationService } from './transportation.service';
import { CreateTransportationInput } from './dto/create-transportation.input';
import { UpdateTransportationInput } from './dto/update-transportation.input';

@Resolver('Transportation')
export class TransportationResolver {
  constructor(private readonly transportationService: TransportationService) {}

  @Mutation('createTransportation')
  create(@Args('createTransportationInput') createTransportationInput: CreateTransportationInput) {
    return this.transportationService.create(createTransportationInput);
  }

  @Query('transportation')
  findAll() {
    return this.transportationService.findAll();
  }

  @Query('transportation')
  findOne(@Args('id') id: number) {
    return this.transportationService.findOne(id);
  }

  @Mutation('updateTransportation')
  update(@Args('updateTransportationInput') updateTransportationInput: UpdateTransportationInput) {
    return this.transportationService.update(updateTransportationInput.id, updateTransportationInput);
  }

  @Mutation('removeTransportation')
  remove(@Args('id') id: number) {
    return this.transportationService.remove(id);
  }
}
