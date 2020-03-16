import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: UserService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
  canActivateClient() {
    if (!this.auth.clientIsLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
