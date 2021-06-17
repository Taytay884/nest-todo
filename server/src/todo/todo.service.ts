import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { TodoCreateDto } from './dto/todo-create.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoEntity } from '@todo/entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
  ) {}
  todos: TodoEntity[] = todos;

  async getAllTodo(): Promise<TodoDto[]> {
    return await this.todoRepo.find();
  }

  async updateTodo({ id, name, description }: TodoDto): Promise<TodoDto> {
    const todoIndex = this.todos.findIndex(
      (todo: TodoEntity) => todo.id === id,
    );
    if (todoIndex === -1) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    this.todos[todoIndex] = { id, name, description };
    const todo = this.todos[todoIndex];
    return toPromise(toTodoDto(todo));
  }

  async destroyTodo(id: string): Promise<TodoDto> {
    const todoIndex = this.todos.findIndex(
      (todo: TodoEntity) => todo.id === id,
    );
    if (todoIndex === -1) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const [todo] = this.todos.splice(todoIndex, 1);
    return toPromise(toTodoDto(todo));
  }

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!todo) {
      throw new HttpException(
        `Todo list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toTodoDto(todo);
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    const todo: TodoEntity = await this.todoRepo.create({
      name,
      description,
    });

    await this.todoRepo.save(todo);
    return toPromise(toTodoDto(todo));
  }
}
