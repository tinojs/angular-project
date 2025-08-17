import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Property } from 'src/app/types/property';
import { UserService } from 'src/app/user/user.service';
import { UserForAuthentication } from 'src/app/types/user';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  property = {} as Property;
  currentUser?: UserForAuthentication;

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.userLoaded$.subscribe(() => {
      this.currentUser = this.userService.user;
    });
    this.activeRoute.params.subscribe((params) => {
      const id = params['id'];

      this.apiService.getPropertyById(id).subscribe((property) => {
        this.property = property;
      });
    });
  }

  isOwner(): boolean {
    return this.property?.creator?._id === this.currentUser?._id;
  }

  onEdit(): void {
    this.router.navigate(['/properties', this.property._id, 'edit']);
  }

  onDelete() {
  if (!this.property?._id) return;

  const confirmed = confirm('Are you sure you want to delete this property?');
  if (!confirmed) return;

  this.apiService.deleteProperty(this.property._id).subscribe({
    next: () => {
      this.router.navigate(['/properties']);
    },
    error: (err) => {
      console.error('Failed to delete property:', err);
    },
  });
}

}
