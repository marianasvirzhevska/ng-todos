import { Component } from '@angular/core';

export interface Todo {
  id: number,
  title: string,
  completed: boolean, 
  date?: any,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  appTitle = 'Angular Application';

}
