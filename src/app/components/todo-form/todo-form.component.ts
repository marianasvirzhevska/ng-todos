import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Todo, TodosService } from '../../shared/services/todos.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  title: string = '';

  constructor(private todoService: TodosService, public translate:  TranslateService) {
    translate.addLangs(['en', 'ua', 'ru']);
    translate.setDefaultLang('en');
    translate.use('en');
   }

  ngOnInit(): void {
  }

  addTodo() {
    const todo: Todo = {
      title: this.title,
      id: Date.now(),
      completed: false,
      date: new Date(),
    }

    this.todoService.addTodo(todo);
    this.title = '';
  }

}
