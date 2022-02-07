import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    TodosPageComponent,
    TodosListComponent,
    CreateTodoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodosRoutingModule,
    LayoutModule,
  ],
})
export class TodosModule { }
