import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, User } from './shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
     selector: 'app-root',
     templateUrl: 'app.component.html'
})
export class AppComponent {
    user: User;

    constructor(
        private router: Router,
        private translateService: TranslateService,
        private authenticationService: AuthService
    ) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }


}