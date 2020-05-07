import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { TranslationsService } from 'src/app/services/translations.service';
import { LANGUAGES } from 'src/app/constants/translations';

interface ILang {
  value: string;
  label: string;
}

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {
  selected: string;
  langs: ILang[] = [
    {value: LANGUAGES.UA, label: 'lang.ua'},
    {value: LANGUAGES.RU, label: 'lang.ru'},
    {value: LANGUAGES.EN, label: 'lang.en'}
  ];

  constructor(
    public translate: TranslationsService,
  ) {}

  ngOnInit(): void {
    this.selected = this.translate.getCurrentLang();
  }

  onSelect(selected: MatSelectChange) {
    this.translate.setLanguage(selected.value);
  }
}
