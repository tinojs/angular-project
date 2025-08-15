import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, tap, throwError } from 'rxjs';
import { UserForAuthentication } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuthentication | undefined>(undefined);
  private userLoaded$$ = new BehaviorSubject<boolean>(false);

  userSubscription: Subscription;

  user: UserForAuthentication | undefined;

  get isLoggedIn() {
    return !!this.user;
  }

  get userLoaded$() {
    return this.userLoaded$$.asObservable();
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$$.asObservable().subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuthentication>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(username: string, email: string, tel: string, password: string, rePassword: string) {
    return this.http
      .post<UserForAuthentication>('/api/register', {
        username,
        email,
        tel,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post('/api/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

getProfile() {
  return this.http
    .get<UserForAuthentication>('/api/users/profile', {
      withCredentials: true,
    })
    .pipe(
      tap((user) => {
        this.user$$.next(user);
        this.userLoaded$$.next(true);
      }),
      catchError((err) => {
        if (err.status === 401) {
          // Not logged in — this is OK
          this.user$$.next(undefined);
          this.userLoaded$$.next(true);
          return of(undefined); // return a fallback observable
        }

        // Unexpected error
        return throwError(() => err);
      })
    );
}


  updateProfile(username: string, email: string, tel?: string) {
    return this.http
      .put<UserForAuthentication>('/api/users/profile', {
        username,
        email,
        tel,
      }, { withCredentials: true })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
