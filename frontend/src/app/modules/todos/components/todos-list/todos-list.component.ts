import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {
  public todos$ = this.todosService.todos$;

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.todosService.init();
  }

  onComplete(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todosService.update(todo);
  }

  onDelete(todo: Todo) {
    this.todosService.delete(todo);
  }
}
