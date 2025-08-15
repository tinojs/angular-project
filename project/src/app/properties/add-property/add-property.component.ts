import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addProperty(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.apiService.addProperty(form.value).subscribe({
      next: () => this.router.navigate(['/properties']),
      error: (err) => console.error('Failed to add property:', err),
    });
  }
}
