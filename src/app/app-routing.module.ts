import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrandPreviewComponent } from './cards/brand-preview/brand-preview.component';
import { BrandsComponent } from './cards/brands/brands.component';
import { CarComponent } from './cards/car/car.component';
import { ModelsComponent } from './cards/models/models.component';
import { SubModelsComponent } from './cards/sub-models/sub-models.component';
import { CarPreviewComponent } from './cards/car-preview/car-preview.component';

export const routes: Routes = [
  { path: '', redirectTo: 'app-root', pathMatch: 'full' },
  { path: 'brands/:brand', component: BrandsComponent },
  { path: 'brand-preview/:brand', component: BrandPreviewComponent },
  { path: 'models/:brand', component: ModelsComponent },
  { path: 'sub-models/:model', component: SubModelsComponent },
  { path: 'car/:model', component: CarComponent },
  { path: 'car-preview/photo/:name', component: CarPreviewComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
