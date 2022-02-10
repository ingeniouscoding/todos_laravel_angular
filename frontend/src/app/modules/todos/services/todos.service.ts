import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TodoCollection } from '../types/todo-collection.interface';
import { TodoResource } from '../types/todo-resource.interface';
import { Todo } from '../types/todo.interface';

const TODO_URL = environment.apiUrl + '/todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);
  private creatingTodo$ = new BehaviorSubject<boolean>(false);
  private updatingTodo$ = new BehaviorSubject<[string, boolean]>(['', false]);
  private deletingTodo$ = new BehaviorSubject<[string, boolean]>(['', false]);

  public todos$: Observable<Todo[]> = this.todosSubject$.asObservable();
  public isCreating$: Observable<boolean> = this.creatingTodo$.asObservable();
  public isUpdating$: Observable<[string, boolean]> = this.updatingTodo$.asObservable();
  public isDeleting$: Observable<[string, boolean]> = this.deletingTodo$.asObservable();

  constructor(private http: HttpClient) { }

  getAll() {
    this.http.get<TodoCollection>(TODO_URL)
      .pipe(
        map((res) => res.data)
      ).subscribe({
        next: (data) => this.todosSubject$.next(data),
      });
  }

  create(body: string) {
    this.creatingTodo$.next(true);

    this.http.post<TodoResource>(TODO_URL, { body })
      .pipe(
        tap(() => this.creatingTodo$.next(false)),
        map((res) => res.data)
      ).subscribe({
        next: (todo) => {
          const lastValues = this.todosSubject$.value;
          lastValues.push(todo);
          this.todosSubject$.next(lastValues);
        },
      });
  }

  update(todo: Todo) {
    this.updatingTodo$.next([todo.id, true]);

    this.http.patch<TodoResource>(`${TODO_URL}/${todo.id}`, todo)
      .pipe(
        tap(() => this.updatingTodo$.next([todo.id, false])),
        map((res) => res.data)
      ).subscribe({
        next: (updatedTodo) => {
          const lastValues = this.todosSubject$.value;
          const newValues = lastValues.map((t) => t.id === updatedTodo.id ? updatedTodo : t);
          this.todosSubject$.next(newValues);
        },
      });
  }

  delete(todo: Todo) {
    this.deletingTodo$.next([todo.id, true]);

    this.http.delete<any>(`${TODO_URL}/${todo.id}`, todo)
      .subscribe({
        next: () => {
          const lastValues = this.todosSubject$.value;
          const newValues = lastValues.filter((t) => t.id !== todo.id);
          this.todosSubject$.next(newValues);
        },
        error: () => this.deletingTodo$.next([todo.id, false]),
      });
  }
}
