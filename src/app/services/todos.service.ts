import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { StorageService } from './storage.service';
import { MESSAGES } from '../constants/messages';
import { SnackBarComponent } from '../common/snack-bar/snack-bar.component';
export interface Todo {
    id: number,
    title: string,
    completed: boolean, 
    userId: number,
    date?: any,
    description?: string,
};

export const config = {
    apiUrl: 'http://localhost:4200'
}; // should be removed after config setup
// @TODO add app config

const mocDesc = 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'

@Injectable({providedIn: 'root'})
export class TodosService {
    private todosSubject = new BehaviorSubject<Todo[]>(null)
    private todos: Todo[] = [];
    private messages = MESSAGES;
    private snackbarVisibleTimeout = 3000;

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private _snackBar: MatSnackBar,
    ) {
        this.initTodos();
    }

    getTodos$() {
        return this.todosSubject.asObservable();
    }

    addTodo(todo: Todo): void {
        this.todos.push(todo);
        this.updateTodos();
        this.openSnackBar(this.messages.TODO_ADDED);
    }

    removeTodo(id: number): void {
        this.todos = this.todos.filter(t => t.id !== id);
        this.updateTodos();
        this.openSnackBar(this.messages.TODO_DELETED);
    }

    toggleDone(id: number): void {
        const item = this.todos.find(item => item.id === id);
        item.completed = !item.completed;
        this.updateTodos();
    }

    editTodo(todo: Todo): void {
        const index = this.todos.findIndex(t => t.id === todo.id);
        this.todos[index] = { ...todo };
        this.updateTodos();
        this.openSnackBar(this.messages.TODO_EDITED);
    }

    getTodoItem(id: number): Todo {
        // @TODO replace with fake backend request
        // return this.http.get<any>(`${config.apiUrl}/todos/${id}`)
        // .pipe(tap(todo => todo));

        return this.todos.find(x => x.id === id);
    }

    private updateTodos(): void {
        const todos = [...this.todos];
        this.todos = todos;
        this.storage.setItem('todos', todos);
        this.todosSubject.next(todos);
    }

    private initTodos(): void {
        this.getTodos()
            .subscribe((todos) => {
                this.todos = todos;
                this.todosSubject.next(todos);
            })
    }

    private getTodos(): Observable<Todo[]> {
        const todos = this.storage.getItem('todos');
        if (todos) {
            return of(todos);
        }
        return this.fetchTodos();
    }

    private fetchTodos(): Observable<Todo[]> {
        const url = 'https://jsonplaceholder.typicode.com/todos'

        return this.http.get<Todo[]>(url).pipe(
            map(todos => {
                return todos.map(todo => {
                    const description = todo.description || mocDesc;
                    return {
                        ...todo,
                        description
                    };
                })
            }),
            tap((todos) => this.storage.setItem('todos', todos)),
        );
    }

    private openSnackBar(message: string): void {
        const config = new MatSnackBarConfig();
        config.duration = this.snackbarVisibleTimeout;
        config.data = message;

        this._snackBar.openFromComponent(SnackBarComponent, config);
      }
}
