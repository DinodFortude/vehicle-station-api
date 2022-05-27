import { Field, ObjectType } from '@nestjs/graphql';
import { Vehicle } from '../entity/vehicle.entity';

@ObjectType()
export class VehicleDeletionResponse {
  @Field()
  massage: string;
  @Field(() => Vehicle)
  deletedVehicle: Vehicle;
}
