import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
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

  init() {
    this.http.get<any>(TODO_URL)
      .pipe(
        map((res) => res.data)
      ).subscribe({
        next: (data) => this.todosSubject$.next(data),
      });
  }

  create(body: string) {
    this.creatingTodo$.next(true);

    this.http.post<any>(TODO_URL, { body })
      .pipe(
        map((res) => res.data)
      ).subscribe({
        next: (todo) => {
          const lastValues = this.todosSubject$.value;
          lastValues.push(todo);
          this.todosSubject$.next(lastValues);
        },
      }).add(
        () => this.creatingTodo$.next(false)
      );
  }

  update(todo: Todo) {
    this.updatingTodo$.next([todo.id, true]);

    this.http.patch<any>(`${TODO_URL}/${todo.id}`, todo)
      .pipe(
        map((res) => res.data)
      ).subscribe({
        next: (updatedTodo) => {
          const lastValues = this.todosSubject$.value;
          const newValues = lastValues.map((t) => t.id === updatedTodo.id ? updatedTodo : t);
          this.todosSubject$.next(newValues);
        },
      }).add(
        () => this.updatingTodo$.next([todo.id, false])
      );
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
