import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LANGUAGES } from '../constants/translations';

@Injectable({providedIn: 'root'})
export class TranslationsService {

    constructor(
        private translateService: TranslateService,
    ) {
        this.translateService.addLangs(Object.keys(LANGUAGES));
        this.translateService.setDefaultLang(LANGUAGES.EN);
        // this.translateService.use(LANGUAGES.EN);
        const browserLang = this.translateService.getBrowserLang();
        translateService.use(browserLang.match(/en|ua|ru/) ? browserLang : LANGUAGES.EN);
    }

    setLanguage(code: string): void {
        this.translateService.use(code);
    }

    getCurrentLang(): string {
        return this.translateService.currentLang;
    }
}
