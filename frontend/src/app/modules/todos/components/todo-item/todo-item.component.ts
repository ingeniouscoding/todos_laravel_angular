import { transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, map } from 'rxjs';

import {
  completeIconEnter,
  completeIconLeave,
  deleteIconEnter,
  deleteIconLeave,
  updateIconEnter,
  updateIconLeave
} from '../../animations/todo-item.animation';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [
    trigger('deleteIcon', [
      transition(':enter', deleteIconEnter),
      transition(':leave', deleteIconLeave),
    ]),
    trigger('completeIcon', [
      transition(':enter', completeIconEnter),
      transition(':leave', completeIconLeave),
    ]),
    trigger('updateIcon', [
      transition(':enter', updateIconEnter),
      transition(':leave', updateIconLeave),
    ]),
  ]
})
export class TodoItemComponent {
  @Input() public todo!: Todo;

  @Output() public delete = new EventEmitter<Todo>();
  @Output() public update = new EventEmitter<Todo>();

  public isDeleteOpen = false;
  public isEditOpen = false;

  public isUpdating$ = this.todosService.isUpdating$
    .pipe(
      filter((tuple) => tuple[0] === this.todo.id),
      map((tuple) => tuple[1])
    );

  public isDeleting$ = this.todosService.isDeleting$
    .pipe(
      filter((tuple) => tuple[0] === this.todo.id),
      map((tuple) => tuple[1])
    );

  constructor(private todosService: TodosService) { }

  onComplete() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.update.emit(this.todo);
  }

  onDelete() {
    this.delete.emit(this.todo);
  }

  onSwipeRight() {
    if (this.isEditOpen) {
      this.isEditOpen = false;
    } else {
      this.isDeleteOpen = true;
    }
  }

  onSwipeLeft() {
    if (this.isDeleteOpen) {
      this.isDeleteOpen = false;
    } else if (!this.isEditOpen) {
      this.isEditOpen = true;
    }
  }
}
