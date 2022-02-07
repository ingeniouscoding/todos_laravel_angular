import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Todo } from '../types/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly todosUrl = environment.apiUrl + '/todos';
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);

  public todos$: Observable<Todo[]> = this.todosSubject$.asObservable();

  constructor(private http: HttpClient) { }

  init() {
    this.http.get<any>(this.todosUrl)
      .pipe(
        tap(res => console.log(res)),
        map((res) => res.data)
      ).subscribe({
        next: (data) => this.todosSubject$.next(data)
      });
  }

  update(todo: Todo) {
    this.http.patch<any>(`${this.todosUrl}/${todo.id}`, todo)
      .pipe(
        tap(data => console.log(data.data)),
      ).subscribe();
  }

  delete(todo: Todo) {
    const lastValues = this.todosSubject$.value;
    const newValues = lastValues.filter((t) => t.id !== todo.id);

    this.http.delete<any>(`${this.todosUrl}/${todo.id}`, todo)
      .subscribe({
        next: () => this.todosSubject$.next(newValues)
      });
  }
}
