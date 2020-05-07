import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {

    constructor(){
    }

    setItem(query: string, data: any): void {
        localStorage.setItem(query, JSON.stringify(data));
    }

    getItem(query: string): any {
        return JSON.parse(localStorage.getItem(query))
    }

}
