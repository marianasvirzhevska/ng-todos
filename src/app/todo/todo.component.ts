import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService, Todo } from '../shared/services/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  private id: number;
  loading = false;
  todo: Todo;
  isOwn: boolean;


  constructor(
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService,
    ) {
    this.id = +this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.todo = this.todosService.getTodoItem(this.id);
    this.isOwn = this.checkOwner(this.todo.userId);
  }

  checkOwner(userId: number): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.id === userId;
  }

  handleDone(id: number) {
    this.todosService.markDone(id);
  } 

  removeTodo(id: number) {
    this.todosService.removeTodo(id);
  }

  editTodo(id: number) {
    console.log('edit clicked');
  }

}
