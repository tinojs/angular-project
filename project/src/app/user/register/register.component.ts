import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { matchPasswordsValidator } from 'src/app/shared/utils/password-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    tel: [''],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const {
      username,
      email,
      tel,
      passGroup: { password, rePassword } = {},
    } = this.registerForm.value;
    this.userService
      .register(username!, email!, tel!, password!, rePassword!)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
