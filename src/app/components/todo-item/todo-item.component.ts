import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { TodosService, Todo } from '../../services/todos.service';
import { User, AuthService } from '../../services/auth.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  private user: User;
  isOwn: boolean;

  @Input() todo: Todo;

  constructor(
    public todosService: TodosService,
    private authService: AuthService,
    public translate: TranslateService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(x => this.user = x);
    this.isOwn = this.todo.userId === this.user.id;
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
