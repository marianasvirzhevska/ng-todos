import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../services/translations.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    public translate: TranslationsService
  ) { }

  ngOnInit(): void {
  }

}
