import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';
import { allVehiclesStub } from './stub/all.vehicles.stub';

describe('VehiclesResolver', () => {
  let resolver: VehiclesResolver;
  let service: VehiclesService;

  const serviceMock = {
    findAll: jest.fn(() => allVehiclesStub),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesResolver,
        {
          provide: VehiclesService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    resolver = module.get<VehiclesResolver>(VehiclesResolver);
    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('vehicles', () => {
    it('should be defined findAll in VehiclesResolver', () => {
      expect(resolver.findAll()).toBeDefined();
    });

    it('should be called findAll() in VehiclesService', () => {
      expect(service.findAll()).toBeCalled;
    });

    it('should find and return all vehicles', async () => {
      const customers = await resolver.findAll();
      console.log(customers);
      expect(customers).toEqual(allVehiclesStub);
    });
  });
});
