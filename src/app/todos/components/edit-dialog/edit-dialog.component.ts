import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
    private todoService: TodosService,
    public translate:  TranslateService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    // const todos = this.todoService.getStoredTodos();
    // this.todo = todos.find(x => +this.data === x.id);
    this.todoEditForm = this.buildForm(this.todo);
  }

  get titleControl() { return this.todoEditForm.get('title'); }
  get descriptionControl() { return this.todoEditForm.get('description'); }

  private buildForm(todo: Todo) {
    return this.formBuilder.group(
      {
        title: [todo.title, Validators.required],
        description: [todo.description, Validators.required]
      }
    )
  }

  onSubmit() {
    this.submitted = true;

    if (this.todoEditForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      ...this.todo,
      ...this.todoEditForm.value,
    };

    this.todoService.editTodo(newTodo);
  }

  handleCancel(): void {
    this.dialogRef.close();
  }
}


