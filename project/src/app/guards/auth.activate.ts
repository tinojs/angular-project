import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, map, take, filter } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userService.userLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => {
        return this.userService.isLoggedIn || this.router.parseUrl('/auth/login');
      })
    );
  }
}
