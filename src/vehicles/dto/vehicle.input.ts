import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VehicleInput {
  @Field()
  id: number;
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field()
  email: string;
  @Field()
  car_make: string;
  @Field()
  car_model: string;
  @Field()
  vin_number: string;
  @Field()
  manufactured_date: string;
  @Field()
  age_of_vehicle: string;
}
