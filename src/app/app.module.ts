import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FiltersComponent } from './todos/components/filters/filters.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';
import { SearchComponent } from './todos/components/search/search.component';

// move to separate modules
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    BrowserAnimationsModule,
    //create separate metiral module
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
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
