import { Component, OnInit, ViewChild } from '@angular/core';

import { TodosService } from '../services/todos.service';

import { IFilter } from '../components/filters/filters.interface';
import { FiltersComponent } from '../components/filters/filters.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  loading = true;
  showForm = false;
  filtersObj: IFilter = {};

  @ViewChild(FiltersComponent) filters: FiltersComponent;

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
    console.log(filter)
    this.filtersObj = filter;
  }

  isFilterVisible() {
    const { status, search, userId } = this.filtersObj;
    return search || userId || status;
  }

  clearFilters() {
    this.filters.reset();
  }
}
