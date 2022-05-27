import {
  BullQueueEvents,
  OnQueueEvent,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { json2csv } from 'json-2-csv';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StreamableFile } from '@nestjs/common';
import { VehiclesController } from 'src/vehicles/vehicles.controller';
import { VehiclesGateway } from 'src/vehicles/gateway/vehicles.gateway';

@Processor('export-queue')
export class ExportProcessor {
  constructor(
    private vehicleService: VehiclesService,
    private readonly vehiclesGateway: VehiclesGateway,
  ) {}

  fs = require('fs');
  public file: any;
  /**
   * process csv file
   * @param job
   * @returns
   */
  @Process('batchdata')
  async handleExportCsv(job: Job): Promise<StreamableFile> {
    console.log('Starting batch data proccessing....');
    console.log(job.data);
    //this.vehicleService.fetchAll();
    const data = await this.vehicleService.fetchSpecificVehicles(
      Number(job.data['age']),
    );
    //console.log(JSON.stringify(data));
    json2csv(
      data,
      (err, csv) => {
        if (err) {
          throw err;
        }
        let fileName = 'vehicles_test';
        this.fs.writeFileSync('./csv/' + fileName.concat('.csv'), csv);
      },
      { excludeKeys: ['__typename'] },
    );

    var file = createReadStream(
      join(process.cwd() + '/csv', 'vehicles_test.csv'),
    );
    return new StreamableFile(file);
  }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  onCompleted(job: Job) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with result ${JSON.stringify(
        job.returnvalue,
      )}`,
    );
    this.vehiclesGateway.socket.emit(
      'csv-export',
      'CSV File Created Successfully',
    );
    console.log('CSV File created successsfuly...');
  }
}
