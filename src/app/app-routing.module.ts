import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  { path: '', component: TodosComponent, canActivate: [AuthGuard], pathMatch: "full"},
  // add guard to check if todo exists
  { path: 'todo/:id', component: TodoComponent, canActivate: [AuthGuard] },
  // add guards opposite to auth guard
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
