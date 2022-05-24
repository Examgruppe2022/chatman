import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestsService } from '../../domain/services/friend-requests.service';
import { Connection, Model, connect } from 'mongoose';
import { FriendRequestEntity } from '../../core/entities/friend-request.entity';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { FriendRequestSchema } from '../../infrastructure/mongoDB/friendrequestSchema';
import { MongoDbModule } from '../../infrastructure/mongoDB/mongoDB.module';
import { UserEntity } from '../../core/entities/User.Entity';
import { UserSchema } from '../../infrastructure/mongoDB/userSchema';
import { FriendRequestsController } from '../../friend-requests/friend-requests.controller';
import { friendrequestProvider } from '../../infrastructure/mongoDB/friendrequestProvider';
import { userProvider } from '../../infrastructure/mongoDB/userProvider';
import { CreateFriendRequestDto } from '../../friend-requests/dto/create-friend-requests.dto';

//this test class is very broken, trying to mock the db isen't working
describe('FriendRequestsService', () => {
  let service: FriendRequestsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let mockFRModel: Model<FriendRequestEntity>;
  let mockUserModel: Model<UserEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoDbModule],
      controllers: [FriendRequestsController],
      providers: [
        {
          provide: 'IFriendRequestService',
          useClass: FriendRequestsService,
        },
        FriendRequestsService,
        ...friendrequestProvider,
        ...userProvider,
      ],
    }).compile();

    service = module.get<FriendRequestsService>(FriendRequestsService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
  //console.log(await service.getAllMyFriendRequests('first'));
  it('should create a user', async () => {
    //arrange
    await service.debugDeleteFriendRequest('first');
    const testRequest = new CreateFriendRequestDto();
    testRequest.receiverUsername = 'first';
    testRequest.senderUsername = 'third';

    //act
    const result = await service.SendRequest(testRequest);
    console.log(result);

    //assert
    expect(result.receiverUsername).toBe(testRequest.receiverUsername);
    expect(result.senderUsername).toBe(testRequest.senderUsername);
    expect(result.isAccepted).toBe(false);

    //clean-up
    await service.debugDeleteFriendRequest('first');
  });
});
