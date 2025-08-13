import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { PropertyRoutingModule } from './property-routing.module';

@NgModule({
  declarations: [PropertiesListComponent],
  imports: [CommonModule, PropertyRoutingModule],
})
export class PropertiesModule {}
