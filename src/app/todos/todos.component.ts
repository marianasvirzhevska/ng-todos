import { Component, OnInit } from '@angular/core';

import { TodosService } from '../shared/services/todos.service';

import { IFilter } from '../components/filters/filters.interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  loading = true;
  showForm = false;
  filtersObj: IFilter;

  constructor(
    public todosService: TodosService,
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

  onFiltersChange(filter: IFilter) {
    this.filtersObj = filter;
  }

  clearFilters() {
    this.filtersObj = null;
  }

}
