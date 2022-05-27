import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { VehiclesGateway } from './gateway/vehicles.gateway';
import { VehiclesService } from './vehicles.service';
import { allVehiclesStub } from './stub/all.vehicles.stub';
import { pagiVehiclesStub } from './stub/pagi.vehicles.stub';
import { singleVehiclesStub } from './stub/single.vehicle.stub';
import { filteredVehiclesStub } from './stub/filtered.vehicles.stub';
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('VehiclesService', () => {
  let service: VehiclesService;

  const vehicleRepositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
  };
  const vehiclesGatewayMock = {
    emit: jest.fn((x: string, y: string) => {
      return '';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: vehicleRepositoryMock,
        },
        {
          provide: VehiclesGateway,
          useValue: vehiclesGatewayMock,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('vehicles', () => {
    it('should be defined findAll in VehiclesService', () => {
      expect(service.findAll()).toBeDefined();
    });

    it('should find and return all vehicles', async () => {
      vehicleRepositoryMock.find.mockReturnValue(allVehiclesStub);
      const vehicles = await service.findAll();
      expect(vehicles).toEqual(allVehiclesStub);
    });
  });

  describe('pagiVehicles', () => {
    it('should be defined findAllPagi in VehiclesService', () => {
      expect(service.findAllPagi('M', 2, 0)).toBeDefined();
    });

    it('should find and return all vehicles', async () => {
      vehicleRepositoryMock.find.mockReturnValue(filteredVehiclesStub);
      const vehicles = await service.findAllPagi('M', 2, 0);
      //console.log(vehicles);
      expect(vehicles).toEqual({
        totalCount: 4,
        filteredVehicles: pagiVehiclesStub,
      });
    });
  });

  describe('createVehicle', () => {
    it('should be defined createVehicle in VehiclesService', () => {
      expect(service.createVehicle(singleVehiclesStub)).toBeDefined();
    });

    it('should create a vehicle and return that', async () => {
      vehicleRepositoryMock.create.mockReturnValue(singleVehiclesStub);
      vehicleRepositoryMock.save.mockReturnValue(singleVehiclesStub);
      vehiclesGatewayMock.emit.mockReturnValue('Created Successfully');
      const vehicle = await service.createVehicle(singleVehiclesStub);
      expect(vehicle).toEqual(singleVehiclesStub);
    });
  });

  describe('createVehicles', () => {
    it('should be defined createVehicles in VehiclesService', () => {
      expect(service.createVehicles(allVehiclesStub)).toBeDefined();
    });

    it('should create vehicles and return that', async () => {
      vehicleRepositoryMock.clear.mockReturnValue({});
      vehicleRepositoryMock.save.mockReturnValue(allVehiclesStub);
      //vehiclesGatewayMock.emit.mockReturnValue('Created Successfully');
      const vehicles = await service.createVehicles(allVehiclesStub);
      expect(vehicles).toEqual(allVehiclesStub);
    });
  });

  describe('updateVehicle', () => {
    it('should be defined updateVehicle in VehiclesService', () => {
      expect(service.update(3, singleVehiclesStub)).toBeDefined();
    });

    it('should update vehicle and return that', async () => {
      vehicleRepositoryMock.update.mockReturnValue(singleVehiclesStub);
      vehicleRepositoryMock.findOne.mockReturnValue(singleVehiclesStub);
      //vehiclesGatewayMock.emit.mockReturnValue('Created Successfully');
      const vehicle = await service.update(3, singleVehiclesStub);
      expect(vehicle).toEqual(singleVehiclesStub);
    });
  });

  describe('destroyVehicle', () => {
    it('should be defined destroyVehicle in VehiclesService', () => {
      expect(service.destroyVehicle(3)).toBeDefined();
    });

    it('should delete a vehicle and return that', async () => {
      vehicleRepositoryMock.findOne.mockReturnValue(singleVehiclesStub);
      vehicleRepositoryMock.delete.mockReturnValue(singleVehiclesStub);
      //vehiclesGatewayMock.emit.mockReturnValue('Created Successfully');
      const vehicle = await service.destroyVehicle(3);
      expect(vehicle).toEqual(singleVehiclesStub);
    });
  });
});
