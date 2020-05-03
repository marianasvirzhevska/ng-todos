import { Component, OnInit, Input } from '@angular/core';
import { TodosService, Todo } from '../../shared/services/todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  constructor(
    public todosService: TodosService
  ) { }

  ngOnInit(): void {
  }

  @Input() todo: Todo;

  onChange(id: number) {
    this.todosService.markDone(id);
  } 

  removeTodo(id: number) {
    this.todosService.removeTodo(id);
  }

  editTodo(id: number) {
    console.log('edit clicked');
  }

}
