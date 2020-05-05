import { Component, OnInit, Input } from '@angular/core';

import { TodosService } from '../shared/services/todos.service';

export interface IFilter {
  search?: string;
  status?: boolean | object;
  userId?: number;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  loading = true;
  showForm = false;
  filtersObj = {};

  constructor(
    public todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.todosService.getTodos()
      .subscribe(() => {
        this.loading = false;
      });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  testOutput($event) {
    this.filtersObj = $event;
  }

}
