import { Component } from '@angular/core';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  domains = EMAIL_DOMAINS;
  constructor(private userService: UserService, private router: Router) {}

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    const { email, password } = loginForm.value;

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
