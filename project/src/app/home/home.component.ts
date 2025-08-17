import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Property } from 'src/app/types/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  latestProperties: Property[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProperties().subscribe((properties) => {
      this.latestProperties = properties
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
    });
  }
}
