import { AuthService } from './../services/auth.service';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.map(user => user != null);
  }
}
