import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../services/todos.service';
import { IFilter } from '../todos/components/filters/filters.interface';

@Pipe({
    name: 'todosFilter',
})
export class TodosFilterPipe implements PipeTransform {
    transform(todos: Todo[], args: IFilter): Todo[] {
        if (args) {
            const { status, userId } = args;

            const filteredByStatus = todos.filter((todo) => {
                if (typeof(status) === 'boolean') {
                    return todo.completed === status;
                } else {
                    return 1;
                }
            });

            return filteredByStatus.filter((todo) => {
                if (userId) {
                    return todo.userId === userId;
                } else {
                    return 1;
                }
            });

        } else {
            return todos;
        }
    }
}
