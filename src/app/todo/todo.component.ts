import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { TodosService, Todo } from '../services/todos.service';
import { User, AuthService } from '../services/auth.service';
import { EditDialogComponent } from '../todos/components/edit-dialog/edit-dialog.component';

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
    private dialog: MatDialog,
    private router: Router,
    ) {
    this.id = +this.activatedRoute.snapshot.params.id;
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.todo = this.todosService.getTodoItem(this.id);
    this.isOwn = this.user.id === this.todo.userId;
  }

  toggleDone(id: number): void {
    this.todosService.toggleDone(id);
  }

  removeTodo(id: number): void {
    this.todosService.removeTodo(id);
    this.router.navigate(['']);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: id,
    });
    dialogRef.afterClosed()
      .subscribe((newTodo: Todo) => {
        if (newTodo) {
          this.todo = newTodo;
        }
      });
  }
}
