import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Todo } from '../types/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly todosUrl = environment.apiUrl + '/todos';

  public todos$: Observable<Todo[]> = this.http.get<any>(this.todosUrl)
    .pipe(
      tap(res => console.log(res)),
      map((res) => res.data)
    );

  constructor(private http: HttpClient) { }

  update(todo: Todo) {
    this.http.patch<any>(`${this.todosUrl}/${todo.id}`, todo)
      .pipe(
        tap(data => console.log(data.data)),
      ).subscribe();
  }

  delete(todo: Todo) {
    this.http.delete<any>(`${this.todosUrl}/${todo.id}`, todo)
      .subscribe();
  }
}
