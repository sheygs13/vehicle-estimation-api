import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
@Module({
  // sets db config on the root module
  // all other modules can access it
  // sqlite is a file-based DB
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'vehicle-estimation.sqlite',
      entities: [User, Report],
      // never set to true on prod, use migration scripts instead
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
