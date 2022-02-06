import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../types/user-register.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  public user: UserRegister = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  constructor(private auth: AuthService) { }

  onSubmit(): void {
    this.auth.register(this.user);
  }
}
