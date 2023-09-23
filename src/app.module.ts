import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { UserModule} from './user/user.module'; 
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
  ]
})
export class AppModule {}

