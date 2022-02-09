import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, map } from 'rxjs';

import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() public todo!: Todo;

  @Output() public delete = new EventEmitter<Todo>();
  @Output() public update = new EventEmitter<Todo>();

  public isOpen = false;

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
    this.isOpen = true;
  }

  onSwipeLeft() {
    this.isOpen = false;
  }
}
