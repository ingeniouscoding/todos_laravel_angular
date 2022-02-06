import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosPageComponent,
    children: [
      { path: '', component: TodosListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule { }
