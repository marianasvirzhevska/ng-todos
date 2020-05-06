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
        this.translateService.use(LANGUAGES.EN);
    }

    setLanguage(code: string) {
        this.translateService.use(code);
    }

    getCurrentLang() {
        return this.translateService.currentLang;
    }
}