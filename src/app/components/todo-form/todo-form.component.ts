import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo, TodosService } from '../../shared/services/todos.service';
import { User, AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  submitted = false;
  user: User;

  @Output() formSubmit = new EventEmitter();

  constructor(
    private todoService: TodosService,
    private authService: AuthService,
    public translate:  TranslateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.todoForm = this.buildForm();
    this.authService.user.subscribe(x => this.user = x);
  }

  get titleControl() { return this.todoForm.get('title'); }
  get descriptionControl() { return this.todoForm.get('description'); }

  onSubmit() {
    this.submitted = true;

    if (this.todoForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      userId: this.user.id,
      completed: false,
      ...this.todoForm.value
    };

    this.todoService.addTodo(newTodo);
    this.formSubmit.emit();
  }

  private buildForm() {
    return this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required]
      }
    )
  }
}
