import { Query, Mutation, Resolver, Args, Int } from '@nestjs/graphql';
import { VehicleDeletionResponse } from './dto/vehicle-deletion.response';
import { VehiclePackInput } from './dto/vehicle-pack.input';
import { VehicleInput } from './dto/vehicle.input';
import { VehiclesResponse } from './dto/vehicles.response';
import { Vehicle } from './entity/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Resolver()
export class VehiclesResolver {
  constructor(private vehicleService: VehiclesService) {}

  @Mutation(() => Vehicle)
  createVehicle(@Args('input') data: VehicleInput) {
    console.log(data);
    return this.vehicleService.createVehicle(data);
  }

  @Mutation(() => [Vehicle], { name: 'createVehicles' })
  createVehicles(
    @Args('input', { type: () => [VehiclePackInput] }) data: VehiclePackInput[],
  ) {
    console.log(data);
    return this.vehicleService.createVehicles(data);
  }

  @Query(() => [Vehicle], { name: 'findSpecificVehicles' })
  findSpecificVehicles(@Args('age', { type: () => Int }) age: number) {
    return this.vehicleService.findSpecificVehicles(age);
  }

  @Query(() => VehiclesResponse, { name: 'findAllVehiclesPagi' })
  findAllPagi(
    @Args('key_word') keyWord: string,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
  ) {
    return this.vehicleService.findAllPagi(keyWord, limit, offset);
  }

  @Mutation(() => Vehicle)
  updateVehicle(@Args('updateVehicleInput') updateVehicleInput: VehicleInput) {
    return this.vehicleService.update(updateVehicleInput);
  }

  @Mutation(() => VehicleDeletionResponse)
  removeVehicle(@Args('vehicleId', { type: () => Int }) id: number) {
    return this.vehicleService.destroyVehicle(id);
  }
}
