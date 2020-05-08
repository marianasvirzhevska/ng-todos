import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User, AuthService } from '../../../services/auth.service';

import { IFilter } from './filters.interface';
import { STATUSES } from 'src/app/constants/statuses';

interface IStatus {
  value: string;
  label: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filtersForm: FormGroup;
  user: User;
  statuses: IStatus[] = [
    {value: STATUSES.ALL, label: 'filters.all'},
    {value: STATUSES.PENDING, label: 'filters.pending'},
    {value: STATUSES.DONE, label: 'filters.done'},
  ];

  filterObj: IFilter;

  @Output() onFiltersChange = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.filtersForm = this.buildForm();
    this.authService.user.subscribe(x => this.user = x);

    this.onChanges();
  }

  clearFilters(): void {
    this.filtersForm.setValue({
      filtersStatus: STATUSES.ALL,
      ownTodos: '',
    });

    this.filterObj = null;
    this.onFiltersChange.emit(null);
  }

  private onChanges(): void {
    this.filtersForm.valueChanges.subscribe(val => {
      this.filterObj = {
        status: this.getStatus(val),
      }

      if (val.ownTodos) {
        this.filterObj.userId = this.user.id;
      }

      this.onFiltersChange.emit(this.filterObj);
     });
  }

  private getStatus(obj): boolean | object {
    const status = obj.filtersStatus;
    switch (status) {
      case 'all':
        return null;
      case 'pending':
        return false;
      case 'done':
        return true;
      default:
        return null;
    }
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group(
      {
        filtersStatus: STATUSES.ALL,
        ownTodos: '',
      }
    )
  };
}
