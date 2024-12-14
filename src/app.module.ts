import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { OfficeModule } from './office/office.module';
import { UserModule } from './user/user.module';

const modules = [AuthModule, UserModule, OfficeModule];
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
})
export class AppModule {}
