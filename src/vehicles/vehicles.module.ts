import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UploadProcessor } from 'src/processors/upload.processor';
import { VehiclesService } from './vehicles.service';
import { ExportProcessor } from 'src/processors/export.processor';
import { VehiclesGateway } from './gateway/vehicles.gateway';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'upload-queue',
    }),
    BullModule.registerQueue({ name: 'export-queue' }),
  ],
  controllers: [VehiclesController],
  providers: [
    UploadProcessor,
    VehiclesService,
    ExportProcessor,
    VehiclesGateway,
  ],
})
export class VehiclesModule {}
