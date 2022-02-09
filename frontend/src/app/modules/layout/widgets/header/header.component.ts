import { Component } from '@angular/core';

import { AuthService } from 'src/app/modules/user/services/auth.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isActive = false;
  public isAuth$ = this.auth.isAuth$;

  constructor(private auth: AuthService) { }

  onShow(): void {
    this.isActive = !this.isActive;
  }

  onLogout(): void {
    this.auth.logout();
  }
}
