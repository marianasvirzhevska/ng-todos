import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User, AuthService } from '../../shared/services/auth.service';

import { IFilter } from './filters.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filtersForm: FormGroup;
  user: User;
  statuses: string[] = ['filters.all', 'filters.pending', 'filters.done'];

  filterObj:IFilter;

  @Output() onFiltersChange = new EventEmitter();

  constructor(
    public translate:  TranslateService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.filtersForm = this.buildForm();
    this.authService.user.subscribe(x => this.user = x);

    this.onChanges();
  }

  private onChanges(): void {
    this.filtersForm.valueChanges.subscribe(val => {
      this.filterObj = {
        search: val.searchString,
        status: this.getStatus(val),
      }

      if (val.ownTodos) {
        this.filterObj.userId = this.user.id;
      }

      this.onFiltersChange.emit(this.filterObj);
     });
  }

  private getStatus(obj): boolean | object {
    const status = obj.filtersStatus.split('.')[1];
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

  private buildForm() {
    return this.formBuilder.group(
      {
        searchString: '',
        filtersStatus: '',
        ownTodos: '',
      }
    )
  };
}
