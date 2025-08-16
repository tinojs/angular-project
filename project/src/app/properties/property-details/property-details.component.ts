import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private userService: UserService
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
    console.log('Edit property:', this.property._id);
    // You can navigate to an edit page here
  }

  onDelete(): void {
    console.log('Delete property:', this.property._id);
    // You can call the API to delete the property here
  }
}
