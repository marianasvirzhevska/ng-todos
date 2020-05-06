import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { LANGUAGES } from 'src/app/shared/constants/translations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  languages = LANGUAGES;

  constructor(
    private translate: TranslationsService
  ) {}

  checkLang(lang: string): boolean {
    return this.translate.getCurrentLang() === lang;
  }

  setLang(code: string) {
    this.translate.setLanguage(code);
  }
}
