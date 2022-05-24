import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from '../../domain/services/login.service';
import { MongoDbModule } from '../../infrastructure/mongoDB/mongoDB.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../loginAndUser/constans';
import { LoginController } from '../../loginAndUser/login.controller';
import { UserController } from '../../loginAndUser/user.controller';
import { UserService } from '../../domain/services/user.service';
import { userProvider } from '../../infrastructure/mongoDB/userProvider';
import { LocalStrategy } from '../../loginAndUser/local.strategy';
import { JwtStrategy } from '../../loginAndUser/jwt.strategy';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongoDbModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [LoginController, UserController],
      providers: [
        {
          provide: 'IUserService',
          useClass: UserService,
        },
        {
          provide: 'ILoginService',
          useClass: LoginService,
        },
        LoginService,
        ...userProvider,
        LocalStrategy,
        JwtStrategy,
        UserService,
      ],
      exports: [LoginService, UserService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
