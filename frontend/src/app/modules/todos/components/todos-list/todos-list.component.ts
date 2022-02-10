import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  animations: [
    trigger('inOutBlock', [
      transition(':enter', [
        style({ transform: 'translate(-200px, -100px) scaleY(0)', opacity: 0 }),
        animate('0.3s', style({ transform: 'translate(0) scaleY(100%)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.3s', keyframes([
          style({ transform: 'translateX(70%)', opacity: 0.2, offset: 0.7 }),
          style({ transform: 'translateX(100%)', height: 0, margin: 0, offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class TodosListComponent implements OnInit {
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
}
