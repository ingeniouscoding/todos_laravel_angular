import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app-root/guards/auth.guard';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TodosListComponent },
      { path: ':id/edit', component: TodoUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule { }
