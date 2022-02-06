import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';


@NgModule({
  declarations: [
    TodosPageComponent,
    TodosListComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
