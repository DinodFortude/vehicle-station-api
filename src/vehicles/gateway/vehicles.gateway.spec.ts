import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesGateway } from './vehicles.gateway';

describe('VehiclesGateway', () => {
  let gateway: VehiclesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesGateway],
    }).compile();

    gateway = module.get<VehiclesGateway>(VehiclesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
