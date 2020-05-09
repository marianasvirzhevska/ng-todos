import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { fakeBackendProvider } from './helpers/pseudo-backend';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthGuard } from './auth.guard';
import { NotAuthGuard } from './notAuth.guard';
import { TodoGuard } from './todo.guard';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.modules';
import { TodosFilterPipe } from './shared/todos.filter.pipe';
import { TodosSearchPipe } from './shared/todos.search.pipe';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component'
import { TodoFormComponent } from './todos/components/todo-form/todo-form.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './common/footer/footer.component';
import { TodoItemComponent } from './todos/components/todo-item/todo-item.component';
import { FiltersComponent } from './todos/components/filters/filters.component';
import { EditDialogComponent } from './todos/components/edit-dialog/edit-dialog.component';
import { LangSwitcherComponent } from './common/header/lang-switcher/lang-switcher.component';
import { SearchComponent } from './todos/components/search/search.component';
import { SnackBarComponent } from './common/snack-bar/snack-bar.component';
import { MaterialModule } from './shared/material.modules';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoFormComponent,
    TodosFilterPipe,
    HeaderComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    FooterComponent,
    TodoItemComponent,
    TodoComponent,
    FiltersComponent,
    EditDialogComponent,
    LangSwitcherComponent,
    SearchComponent,
    TodosSearchPipe,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    AuthGuard,
    NotAuthGuard,
    TodoGuard,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
