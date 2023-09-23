import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { UserModule} from './user/user.module'; 
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SaleService } from './sale/sale.service';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { SaleController } from './sale/sale.controller';
import { SaleService } from './sale/sale.service';


@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    CustomerModule,
    OrderModule,
  ],
  providers: [SaleService, CustomerService, OrderService],
  controllers: [SaleController, CustomerController, OrderController]
})
export class AppModule {}

