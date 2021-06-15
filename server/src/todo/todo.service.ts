import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { v4 as uuid } from 'uuid';
import { TodoCreateDto } from './dto/todo-create.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
  todos: TodoEntity[] = todos;

  async getAllTodo(): Promise<TodoDto[]> {
    const todos = this.todos.map(toTodoDto);
    return toPromise(todos);
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
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toTodoDto(todo));
  }
  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    const todo: TodoEntity = {
      id: uuid(),
      name,
      description,
    };

    this.todos.push(todo);
    return toPromise(toTodoDto(todo));
  }
}
