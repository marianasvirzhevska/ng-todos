import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators'

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
    // make this private and expose by getter
    public todos: Todo[] = [];

    constructor(private http: HttpClient) {
    }

    getTodos(): Observable<Todo[]> {
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos) {
            this.todos = todos;
            return of(todos);
        } else {
            return this.fetchTodos();
        }
    }

    fetchTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .pipe(tap(todos => {
            todos.forEach(element => {
                if (!element.description) {
                    element.description = mocDesc;
                }
            });

            localStorage.setItem('todos', JSON.stringify(todos));

            return this.todos = todos;
            }
         ))
    }

    markDone(id: number) {
        const index = this.todos.findIndex(t => t.id === id);
        this.todos[index].completed = true;
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    removeTodo(id: number) {
        this.todos = this.todos.filter(t => t.id !== id);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    addTodo(todo: Todo) {
        this.todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    editTodo(todo: Todo) {
        const index = this.todos.findIndex(t => t.id === todo.id);
        this.todos[index] = { ...todo };
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodoItem(id: number) {
        // @TODO replace with fake backend request
        // return this.http.get<any>(`${config.apiUrl}/todos/${id}`)
        // .pipe(tap(todo => todo));

        if (!this.todos.length) {
            const storageTodos = JSON.parse(localStorage.getItem('todos'));
            this.todos = storageTodos;
        }

        return this.todos.find(x => x.id === id);
    }

}
