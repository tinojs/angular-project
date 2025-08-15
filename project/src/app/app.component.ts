import { Component } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        console.log('User session restored');
      },
      error: (err) => {
        if (err.status === 401) {
          // Not logged in, no redirect here — just clear any user data if needed
          console.log('No active session');
        } else {
          // For other errors, optionally show error page or notification
          console.error('Unexpected error', err);
        }
      },
    });
  }
}
