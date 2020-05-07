import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../shared/services/todos.service';
import { IFilter } from '../components/filters/filters.interface';


@Pipe({
    name: 'todosFilter',
})
export class TodosFilterPipe implements PipeTransform {
    transform(todos: Todo[], args: IFilter): Todo[] {
        if (args) {
            const { search, status, userId } = args; 

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

            if (!search?.trim()) {
                return filteredByUser;
            }

            return filteredByUser.filter((todo) => {
                return todo.title.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
            })
        } else {
            return todos;
        }
    }

}
