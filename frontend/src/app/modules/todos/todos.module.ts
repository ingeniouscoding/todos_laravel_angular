import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { LayoutModule } from '../layout/layout.module';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';

@NgModule({
  declarations: [
    TodosPageComponent,
    TodosListComponent,
    CreateTodoComponent,
    TodoItemComponent,
    TodoUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodosRoutingModule,
    LayoutModule,
  ],
})
export class TodosModule { }
