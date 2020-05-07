import { Component, OnInit } from '@angular/core';
import { TranslationsService } from 'src/app/shared/services/translations.service';
import { LANGUAGES } from 'src/app/shared/constants/translations';
import { AuthService, User } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  languages = LANGUAGES;
  user: User;

  constructor(
    private translate: TranslationsService,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(x => this.user = x);
  }
  
  checkLang(lang: string): boolean {
    return this.translate.getCurrentLang() === lang;
  }

  setLang(code: string) {
    this.translate.setLanguage(code);
  }
}
