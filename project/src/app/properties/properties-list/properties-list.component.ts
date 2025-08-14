import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Property } from 'src/app/types/property';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css'],
})
export class PropertiesListComponent implements OnInit {

  properties: Property[] | null = null;

  constructor(private api: ApiService, private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
  
  get userId(): string | undefined {
    return this.userService.user?.id || '';
  }

  ngOnInit(): void {
    this.api.getProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }
}
