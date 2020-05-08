import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { StorageService } from './services/storage.service';

@Injectable({ providedIn: 'root' })
export class TodoGuard implements CanActivate {
    constructor(
        private router: Router,
        private storage: StorageService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        const todoId = +route.params.id
        const todos = this.storage.getItem('todos');
        const todo = todos.find((x) => x.id === todoId);

        if (todo) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
