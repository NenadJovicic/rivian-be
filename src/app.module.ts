import { MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { ChargingSessionModule } from './charging-session/charging-session.module';
import { ChargingSpotModule } from './charging-spot/charging-spot.module';
import { OfficeModule } from './office/office.module';
import { QueueModule } from './queue/queue.module';
import { TestDataModule } from './test-data/test-data.module';
import { UserModule } from './user/user.module';

const modules = [AuthModule, UserModule, OfficeModule, ChargingSpotModule, ChargingSessionModule, QueueModule, TestDataModule];
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      retryAttempts: 3,
      autoLoadModels: true,
      synchronize: true,
      timezone: 'Europe/Belgrade',
      logging: (sqlQuery: string, timeInMs: number) => console.log(`Query: ${sqlQuery}. \n Execution time: ${timeInMs} ms`),
      benchmark: true,
    }),
    ...modules,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/auth/(.*)', method: RequestMethod.ALL })
      .exclude({ path: '/test-data', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
