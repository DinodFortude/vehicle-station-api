import {
  BullQueueEvents,
  OnQueueEvent,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Processor('upload-queue')
export class UploadProcessor {
  constructor(private vehicleService: VehiclesService) {}

  /**
   * process csv file
   * @param job
   * @returns
   */
  @Process('csv')
  async handleCsvFiles(job: Job) {
    const vehicles = [];
    const csv = require('csvtojson');
    const csvFilePath = process.cwd() + '/' + job.data['file']['path'];
    console.log(csvFilePath);
    const vehicleArray = await csv().fromFile(csvFilePath);
    console.log(vehicleArray);
    // await this.vehicleRepository.clear();
    //await this.vehicleRepository.save(vehicleArray);
    for (let i = 0; i < vehicleArray.length; i++) {
      for (var key in vehicleArray[i]) {
        if (key == 'id') {
          vehicleArray[i][key] = parseInt(vehicleArray[i][key], 10);
        }
      }

      let currentTime = new Date().getTime();
      let birthDateTime = new Date(
        vehicleArray[i]['manufactured_date'],
      ).getTime();
      let difference = currentTime - birthDateTime!;
      var ageInYears = difference / (1000 * 60 * 60 * 24 * 365);
      console.log(ageInYears);

      var ageRound;
      var ageString;

      if (ageInYears >= 1) {
        ageRound = Math.floor(ageInYears);
        if (ageRound == 1) {
          ageString = ageRound + ' year';
        } else {
          ageString = ageRound + ' years';
        }
      } else {
        ageInYears = ageInYears * 12;
        if (ageInYears >= 1) {
          ageRound = Math.floor(ageInYears);
          if (ageRound == 1) {
            ageString = ageRound + ' month';
          } else {
            ageString = ageRound + ' months';
          }
        } else {
          ageRound = Math.floor(ageInYears * 31);
          if (ageRound == 1) {
            ageString = ageRound + ' day';
          } else {
            ageString = ageRound + ' days';
          }
        }
      }

      vehicleArray[i]['age_of_vehicle'] = ageString;
      console.log(vehicleArray[i]);
      vehicles.push(vehicleArray[i]);
    }
    console.log('Time to Completing DB writting...');
    console.log(vehicles);
    await this.vehicleService.saveRecoards(vehicles);
    //this.vehicleService.fetchAll();
    await this.vehicleService.fetchSpecificVehicles(6);

    return 'Upload successfully';
  }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  onCompleted(job: Job) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with result ${job.returnvalue}`,
    );
    if (true) {
      console.log('CSV File uploaded successsfuly...');
    }
  }
}
