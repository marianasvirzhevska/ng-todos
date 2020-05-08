import { Component, OnInit, ViewChild } from '@angular/core';

import { TodosService, Todo } from '../services/todos.service';

import { IFilter } from './components/filters/filters.interface';
import { FiltersComponent } from './components/filters/filters.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  loading = true;
  showForm = false;
  filtersObj: IFilter;
  search: string;
  todos: Todo[];

  @ViewChild(FiltersComponent) filters: FiltersComponent;

  constructor(
    public todosService: TodosService,
  ) {}

  ngOnInit(): void {
    this.todosService.getTodos$()
      .subscribe((todos) => {
        this.todos = todos;
        this.loading = false;
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onFiltersChange(filter: IFilter): void {
    this.filtersObj = filter;
  }

  onSearchChange(search: string): void {
    this.search = search;
  }

}
