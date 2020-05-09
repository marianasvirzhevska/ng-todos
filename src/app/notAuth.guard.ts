import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.currentUserValue;
        if (!user) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
