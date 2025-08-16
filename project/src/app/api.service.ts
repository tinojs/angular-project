import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreatePropertyDto, Property } from './types/property';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProperties() {
    const { apiUrl } = environment;

    return this.http.get<Property[]>(`${apiUrl}/properties`);
  }

  addProperty(property: CreatePropertyDto): Observable<Property> {
    const { apiUrl } = environment;

    return this.http.post<Property>(`${apiUrl}/properties`, property, {withCredentials: true});
  }

  getPropertyById(id: string) {
    const { apiUrl } = environment;

    return this.http.get<Property>(`${apiUrl}/properties/${id}`);
  }
}
