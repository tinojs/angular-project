import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Property, CreatePropertyDto } from 'src/app/types/property';

@Component({
  selector: 'app-edit-property',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css'],
})
export class PropertyEditComponent implements OnInit {
  property: Property | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.apiService.getPropertyById(id).subscribe((property) => {
      this.property = property;
    });
  }

  onEdit(form: NgForm): void {
    if (!this.property) return;

    const updatedProperty: CreatePropertyDto = form.value;

    this.apiService.editProperty(this.property._id, updatedProperty).subscribe(() => {
      this.router.navigate(['/properties', this.property!._id]);
    });
  }
}
