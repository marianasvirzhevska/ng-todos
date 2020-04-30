import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../shared/services/auth.service';

export const config = {
    apiUrl: 'http://localhost:4200'
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let users: User[] = [
            { id: 1, username: 'test', password: 'test', email: 'test@email.com' }
        ];

        const storageUsers = localStorage.getItem('users');

        if (storageUsers) {
            users = JSON.parse(storageUsers);
        }

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('jwt-token fake-jwt-token');

        return of(null).pipe(mergeMap(() => {

            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: `fake-jwt-token`
                });
            }

            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                const reqBody = request.body.user;
                const reqUser = JSON.parse(reqBody);

                const isUserExist = users.find(x => x.username === reqBody.username || x.email === reqBody.email);
                if (isUserExist) return error('Username or email is already in use.');
                
                const user = {
                    id: Date.now(),
                    username: reqUser.username,
                    email: reqUser.email,
                    password: reqUser.password,
                    token: `fake-jwt-token`
                };
                
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: `fake-jwt-token`
                });
            }

            if (request.url.endsWith('/todos/create') && request.method === 'POST') {
                if (!isLoggedIn) return unauthorised();
                return ok(users);
            }

            return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};