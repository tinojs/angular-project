import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { AddPropertyComponent } from './add-property/add-property.component';

const routes: Routes = [
  {
    path: 'properties',
    children: [
      { path: '', pathMatch: 'full', component: PropertiesListComponent },
    ],
  },
  { path: 'add-property', component: AddPropertyComponent }, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
