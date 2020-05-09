import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo, TodosService } from '../../../services/todos.service';

export interface DialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  todoEditForm: FormGroup;
  submitted = false;
  private todo: Todo;

  constructor(
    private todosService: TodosService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) {}

  ngOnInit(): void {
    this.todo = this.todosService.getTodoItem(+this.data);
    this.todoEditForm = this.buildForm(this.todo);
  }

  get titleControl() { return this.todoEditForm.get('title');}
  get descriptionControl() { return this.todoEditForm.get('description');}

  private buildForm(todo: Todo) {
    return this.formBuilder.group(
      {
        title: [todo.title, Validators.required],
        description: [todo.description, Validators.required]
      }
    )
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.todoEditForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      ...this.todo,
      ...this.todoEditForm.value,
    };

    this.todosService.editTodo(newTodo);
    this.dialogRef.close(newTodo);
  }

  handleCancel(): void {
    this.dialogRef.close();
  }
}


