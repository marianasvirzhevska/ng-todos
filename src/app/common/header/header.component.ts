import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.user.subscribe(x => this.user = x);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
