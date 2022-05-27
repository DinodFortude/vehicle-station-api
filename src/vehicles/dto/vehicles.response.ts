import { Field, ObjectType } from '@nestjs/graphql';
import { Vehicle } from '../entity/vehicle.entity';

@ObjectType()
export class VehiclesResponse {
  @Field()
  totalCount: number;
  @Field(() => [Vehicle])
  filteredVehicles: Vehicle[];
}
