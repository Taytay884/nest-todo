import { IsNotEmpty } from 'class-validator';
import { TaskDto } from '../../task/dto/task.dto';

export class TodoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdOn?: Date;
  description?: string;
  tasks?: TaskDto[];
}
