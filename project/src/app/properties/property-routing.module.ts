import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { AuthActivate } from '../guards/auth.activate';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyEditComponent } from './property-edit/property-edit.component';

const routes: Routes = [
  {
    path: 'properties',
    children: [
      { path: '', pathMatch: 'full', component: PropertiesListComponent },
    ],
  },
  {
    path: 'add-property',
    component: AddPropertyComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'properties/:id',
    component: PropertyDetailsComponent,
  },
  {
    path: 'properties/:id/edit',
    component: PropertyEditComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
