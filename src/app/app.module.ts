import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MaterialModule } from '@blox/material';
import { FormsModule } from '@angular/forms';
import { BrandsComponent } from './cards/brands/brands.component';
import { HttpClientModule } from '@angular/common/http';
import { CarComponent } from './cards/car/car.component';
import { CarPreviewComponent } from './cards/car-preview/car-preview.component';
import { BrandPreviewComponent } from './cards/brand-preview/brand-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './cards/main/main.component';
import { ModelsComponent } from './cards/models/models.component';
import { SubModelsComponent } from './cards/sub-models/sub-models.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    CarComponent,
    CarPreviewComponent,
    BrandPreviewComponent,
    MainComponent,
    ModelsComponent,
    SubModelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
