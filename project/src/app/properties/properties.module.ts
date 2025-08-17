import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertyRoutingModule } from './property-routing.module';
import { AddPropertyComponent } from './add-property/add-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyEditComponent } from './property-edit/property-edit.component';

@NgModule({
  declarations: [PropertiesListComponent, AddPropertyComponent, PropertyDetailsComponent, PropertyEditComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    FormsModule,
  ],
})
export class PropertiesModule {}
