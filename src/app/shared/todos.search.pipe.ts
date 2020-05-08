import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../services/todos.service';

@Pipe({
    name: 'todosSearch',
})
export class TodosSearchPipe implements PipeTransform {
    transform(todos: Todo[], search: string = ''): Todo[] {
        if (!search.trim()) {
            return todos;
        }

        return todos.filter((todo) => {
            return todo.title.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
        })
    }
}
