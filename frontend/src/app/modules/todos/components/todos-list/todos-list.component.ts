import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateX(-50%)', opacity: 0 }),
          stagger('70ms', [
            animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
          ]),
        ], { optional: true }),
        query(':leave', [
          stagger('100ms', [
            animate('400ms ease-in-out', keyframes([
              style({ transform: 'translateX(50%)', opacity: 0, offset: 0.7 }),
              style({ transform: 'translateX(100%)', height: 0, margin: 0, offset: 1 }),
            ])),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class TodosListComponent implements OnInit {
  public isLoading$ = this.todosService.isLoading$;

  public todos$ = this.todosService.todos$
    .pipe(
      map(
        (todos) => todos.sort((a, b) => +new Date(b.createdAt!) - +new Date(a.createdAt!))
      )
    );

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.todosService.getAll();
  }

  onUpdate(todo: Todo) {
    this.todosService.update(todo);
  }

  onDelete(todo: Todo) {
    this.todosService.delete(todo);
  }

  trackById(index: number, todo: Todo) {
    return todo.id;
  }
}
