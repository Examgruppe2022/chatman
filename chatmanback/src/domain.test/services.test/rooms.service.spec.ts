import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from '../../domain/services/rooms.service';
import { MongoDbModule } from '../../infrastructure/mongoDB/mongoDB.module';
import { RoomsController } from '../../rooms/rooms.controller';
import { roomProvider } from '../../infrastructure/mongoDB/roomProvider';
import { userProvider } from '../../infrastructure/mongoDB/userProvider';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoDbModule],
      controllers: [RoomsController],
      providers: [
        {
          provide: 'IRoomService',
          useClass: RoomsService,
        },
        RoomsService,
        ...roomProvider,
        ...userProvider,
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
