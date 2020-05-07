import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService
  ) {
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}

}
