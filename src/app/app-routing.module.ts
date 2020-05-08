import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { NotAuthGuard } from './notAuth.guard';
import { TodoGuard } from './todo.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  { path: '', component: TodosComponent, canActivate: [AuthGuard], pathMatch: "full"},
  { path: 'todo/:id', component: TodoComponent, canActivate: [TodoGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
