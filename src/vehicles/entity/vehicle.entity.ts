import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('vehicle')
export class Vehicle {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column('varchar')
  first_name: string;
  @Field()
  @Column('varchar')
  last_name: string;
  @Field()
  @Column('varchar')
  email: string;
  @Field()
  @Column('varchar')
  car_make: string;
  @Field()
  @Column('varchar')
  car_model: string;
  @Field()
  @Column('varchar')
  vin_number: string;
  @Field()
  @Column('date')
  manufactured_date: string;
  @Field()
  @Column('varchar')
  age_of_vehicle: string;
}
