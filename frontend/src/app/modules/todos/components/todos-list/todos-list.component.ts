import { Component } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent {
  public todos$ = this.todosService.todos$;

  constructor(private todosService: TodosService) { }

  onComplete(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todosService.update(todo);
  }

}
