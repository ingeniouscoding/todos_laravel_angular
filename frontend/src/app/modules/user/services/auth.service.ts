import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../app-root/services/local-storage.service';
import { UserLogin } from '../types/user-login.interface';
import { UserRegister } from '../types/user-register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);

  public isAuth$ = this.authStatus.asObservable();

  private readonly registerUrl = environment.apiUrl + '/register';
  private readonly loginUrl = environment.apiUrl + '/login';
  private readonly logoutUrl = environment.apiUrl + '/logout';

  constructor(
    private storage: LocalStorageService,
    private http: HttpClient,
    private router: Router
  ) {
    let isAuthenticated = !!this.storage.getItem('is_authenticated');
    this.authStatus.next(isAuthenticated);
  }

  register(user: UserRegister): void {
    this.http.post(this.registerUrl, user)
      .subscribe({
        next: () => {
          this.setLoggedIn();
          this.router.navigate(['/todos']);
        },
      });
  }

  login(user: UserLogin): void {
    this.http.post(this.loginUrl, user)
      .subscribe({
        next: () => {
          this.setLoggedIn();
          this.router.navigate(['/todos']);
        },
      });
  }

  logout(): void {
    this.http.post(this.logoutUrl, {})
      .subscribe({
        next: () => {
          this.setLoggedOut();
          this.router.navigate(['/login']);
        },
      });
  }

  isLoggedIn(): boolean {
    return !!this.storage.getItem('is_authenticated');
  }

  private setLoggedIn() {
    this.storage.setItem('is_authenticated', 'true');
    this.authStatus.next(true);
  }

  private setLoggedOut() {
    this.authStatus.next(true);
    this.storage.removeItem('is_authenticated');
  }
}
