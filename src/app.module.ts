import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { UserModule} from './user/user.module'; 
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SaleService } from './sale/sale.service';
import { SaleController } from './sale/sale.controller';
import { SaleService } from './sale/sale.service';


@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
  ],
  providers: [SaleService],
  controllers: [SaleController]
})
export class AppModule {}

