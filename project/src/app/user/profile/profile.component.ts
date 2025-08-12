import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileData } from 'src/app/types/user';
import { UserService } from '../user.service';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { emailValidator } from 'src/app/shared/utils/email-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  showEditForm: boolean = false;

  profileData: ProfileData = {
    username: '',
    email: '',
    tel: '',
  };

  profileForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    tel: [''],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.profileData = {
          username: user.username,
          email: user.email,
          tel: user.tel,
        };
        this.profileForm.patchValue(this.profileData);
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      },
    });

    // this.profileData = { username, email, tel };
    // this.profileForm.patchValue({ username, email, tel: tel || '' });
  }

  onToggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.profileData = this.profileForm.value as ProfileData;
    const { username, email, tel } = this.profileData;

    this.userService.updateProfile(username, email, tel).subscribe(() => {
      this.onToggleEditForm();
    });
  }

  onCancelEdit(ev: Event) {
    ev.preventDefault();
    this.onToggleEditForm();
  }
}
