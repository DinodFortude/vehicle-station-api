import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';
import { VehiclesGateway } from './gateway/vehicles.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [VehiclesResolver, VehiclesService, VehiclesGateway],
})
export class VehiclesModule {}
