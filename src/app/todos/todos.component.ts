import { Component, OnInit } from '@angular/core';

import { TodosService } from '../shared/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  loading = true;
  searchString = '';

  constructor(
    public todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.todosService.getTodos()
      .subscribe(() => {
        this.loading = false;
      });
  }

}
