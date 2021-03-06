import { Component } from '@angular/core';

import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-create',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  public body = '';
  public isLoading$ = this.todosService.isCreating$;

  constructor(private todosService: TodosService) { }

  onCreate() {
    if (!this.body) return;

    this.todosService.create(this.body);
    this.body = '';
  }
}
