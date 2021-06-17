import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from '@todo/todo.module';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {
  static forRoot(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [TodoModule, TypeOrmModule.forRoot(connOptions)],
      providers: [AppService],
    };
  }
}
