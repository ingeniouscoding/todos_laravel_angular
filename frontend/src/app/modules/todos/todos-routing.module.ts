import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app-root/guards/auth.guard';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosPageComponent } from './pages/todos-page/todos-page.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosPageComponent,
    children: [
      { path: '', component: TodosListComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule { }
