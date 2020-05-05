import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../shared/services/todos.service';


@Pipe({
    name: 'todosFilter',
    
})
export class TodosFilterPipe implements PipeTransform {
    transform(todos: Todo[], search: string = '', status: boolean, userId: number = null): Todo[] {
        console.log('log', search, status, userId)

        const filteredByStatus = todos.filter((todo) => {
            if (typeof(status) === 'boolean') {
                return todo.completed === status;
            } else {
                return 1;
            }
        });

        const filteredByUser = filteredByStatus.filter((todo) => {
            if (userId) {
                return todo.userId === userId;
            } else {
                return 1;
            }
        });

        if (!search.trim()) {
            return filteredByUser;
        }

        return filteredByUser.filter((todo) => {
            return todo.title.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
        })
    }

}
