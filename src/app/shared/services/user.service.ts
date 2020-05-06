import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const config = {
    apiUrl: 'http://localhost:4200'
}; // should be removed after config setup
export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
}

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) { }

    login() {
        // return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    register() {

    }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
}

