import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { InjectQueue } from '@nestjs/bull';
import Bull, { Queue } from 'bull';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Observable, Subscriber } from 'rxjs';
import { Response } from 'express';
import { json } from 'stream/consumers';

@Controller('/api/vehicles')
export class VehiclesController {
  constructor(
    @InjectQueue('upload-queue') private fileQueue: Queue,
    @InjectQueue('export-queue') private exportQueue: Queue,
  ) {}

  public myJob: Bull.Job<any>;
  public static success: boolean = false;

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './csv',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadCsv(@UploadedFile() file) {
    this.fileQueue.add('csv', { file: file });
    console.log('Yes it uploaded...' + JSON.stringify(file));
  }

  @Get('/export')
  //@UseInterceptors(DataTransformInterceptor)
  async findOne(
    @Query() query: any,
    //@Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    //exportData();
    //return 'Export vehicle ' + query.id;
    console.log('I am from method handler');

    this.exportQueue.add('batchdata', { age: query.age });

    return 'csv file request created successfuly';
  }

  @Get('/get-csv')
  async getFinal(): Promise<StreamableFile> {
    var file = createReadStream(
      join(process.cwd() + '/csv', 'vehicles_test.csv'),
    );
    //this.file = new StreamableFile(file);
    return new StreamableFile(file);
  }
}
