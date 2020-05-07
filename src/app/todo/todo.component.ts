import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { TodosService, Todo } from '../shared/services/todos.service';
import { User, AuthService } from '../shared/services/auth.service';
import { EditDialogComponent } from '../components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  private id: number;
  loading = false;
  todo: Todo;
  private user: User;
  isOwn: boolean;


  constructor(
    private activatedRoute: ActivatedRoute,
    private todosService: TodosService,
    private authService: AuthService,
    public dialog: MatDialog,
    ) {
    this.id = +this.activatedRoute.snapshot.params.id;
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.todo = this.todosService.getTodoItem(this.id);
    this.isOwn = this.checkOwner(this.todo.userId);
  }

  checkOwner(userId: number): boolean {
    return this.user.id === userId;
  }

  handleDone(id: number) {
    this.todosService.markDone(id);
  } 

  removeTodo(id: number) {
    this.todosService.removeTodo(id);
  }

  openDialog(id: number): void {
    this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: id,
    });
  }
}
