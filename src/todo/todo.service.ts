import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private readonly todoRepo: Repository<Todo>){}

  async create(payload: CreateTodoDto, user: User) {
    const todo = new Todo();
    todo.userId = user.id;
    todo.title = payload.title;
    todo.description = payload.description;
    Object.assign(todo, payload);
    this.todoRepo.create(todo);
    return await this.todoRepo.save(todo);    
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
