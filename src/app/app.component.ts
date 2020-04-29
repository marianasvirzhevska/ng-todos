import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';
import { User } from './shared/services/user.service';

@Component({
     selector: 'app-root',
     templateUrl: 'app.component.html'
})
export class AppComponent {
    user: User;

    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}