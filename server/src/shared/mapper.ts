import { TodoDto } from '@todo/dto/todo.dto';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TaskEntity } from '@todo/entity/task.entity';
import { TaskDto } from '../task/dto/task.dto';

export const toTodoDto = (data: TodoEntity): TodoDto => {
  const { id, name, description, tasks } = data;

  let todoDto: TodoDto = {
    id,
    name,
    description,
  };

  if (tasks) {
    todoDto = {
      ...todoDto,
      tasks: tasks.map((task: TaskEntity) => toTaskDto(task)),
    };
  }

  return todoDto;
};

export const toTaskDto = (data: TaskEntity): TaskDto => {
  const { id, name, todo } = data;

  let taskDto: TaskDto = {
    id,
    name,
  };

  if (todo) {
    taskDto = {
      ...taskDto,
      todo: toTodoDto(todo),
    };
  }

  return taskDto;
};
