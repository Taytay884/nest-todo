import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { toPromise } from '@shared/utils';
import { TodoCreateDto } from './dto/todo-create.dto';
import { TodoListDto } from './dto/todo-list.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async findAll(): Promise<TodoListDto> {
    const todos = await this.todoService.getAllTodo();

    return toPromise({ todos });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.getOneTodo(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
    return await this.todoService.createTodo(todoCreateDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() todoDto: TodoDto,
  ): Promise<TodoDto> {
    return await this.todoService.updateTodo(todoDto);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.destroyTodo(id);
  }
}
