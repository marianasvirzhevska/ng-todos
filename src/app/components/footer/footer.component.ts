import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/services/translations.service';
import { LANGUAGES } from 'src/app/constants/translations';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  languages = LANGUAGES;
  user: User;
  currentLanguage: string;

  constructor(
    private translate: TranslationsService,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(x => this.user = x);
    this.currentLanguage = this.translate.getCurrentLang();
    setTimeout(() => this.currentLanguage = this.languages.RU, 2000);
  }

  setLang(code: string) {
    this.translate.setLanguage(code);
  }
}
