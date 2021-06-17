import { IsNotEmpty } from 'class-validator';
import { TodoDto } from '@todo/dto/todo.dto';

export class TaskDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  todo?: TodoDto;
}
