import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { StorageService } from './storage.service';

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

const mocDesc = ' Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'

@Injectable({providedIn: 'root'})
export class TodosService {
    private todosSubject = new BehaviorSubject<Todo[]>([])
    private todos: Todo[] = [];

    constructor(
        private http: HttpClient,
        private storage: StorageService,
    ) {
        this.initTodos();
    }

    getTodos$() {
        return this.todosSubject.asObservable();
    }

    addTodo(todo: Todo) {
        this.todos.push(todo);
        this.updateTodos();
    }

    removeTodo(id: number) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.updateTodos();
    }

    toggleDone(id: number) {
        const item = this.todos.find(item => item.id === id);
        item.completed = !item.completed;
        this.updateTodos();
    }


    editTodo(todo: Todo) {
        const index = this.todos.findIndex(t => t.id === todo.id);
        this.todos[index] = { ...todo };
        this.updateTodos();
    }

    getTodoItem(id: number) {
        // @TODO replace with fake backend request
        // return this.http.get<any>(`${config.apiUrl}/todos/${id}`)
        // .pipe(tap(todo => todo));

        if (!this.todos.length) {
            const storageTodos = this.storage.getItem('todos');
            this.todos = storageTodos;
        }

        return this.todos.find(x => x.id === id);
    }

    private updateTodos() {
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
}
