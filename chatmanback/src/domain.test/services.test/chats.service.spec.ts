import { Test, TestingModule } from '@nestjs/testing';
import { ChatsService } from '../../domain/services/chats.service';
import { MongoDbModule } from '../../infrastructure/mongoDB/mongoDB.module';
import { ChatsController } from '../../chats/chats.controller';
import { ChatsGateway } from '../../chats/chats.gateway';
import { roomProvider } from '../../infrastructure/mongoDB/roomProvider';
import { chatProvider } from '../../infrastructure/mongoDB/chatProvider';

describe('ChatsService', () => {
  let service: ChatsService;
  jest.setTimeout(50000);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoDbModule],
      controllers: [ChatsController],
      providers: [
        {
          provide: 'IChatsService',
          useClass: ChatsService,
        },
        ChatsGateway,
        ChatsService,
        ...roomProvider,
        ...chatProvider,
      ],
    }).compile();

    service = module.get<ChatsService>(ChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
