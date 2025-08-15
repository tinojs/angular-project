import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take, filter } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class GuestActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.userLoaded$.pipe(
      filter((loaded) => loaded),  // wait for profile load
      take(1),
      map(() => {
        return !this.userService.isLoggedIn || this.router.parseUrl('/');
      })
    );
  }
}
