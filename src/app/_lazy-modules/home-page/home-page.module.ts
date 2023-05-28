import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from "./home-page-routing.module";

@NgModule({
  imports: [
    CommonModule,
    HomePageRoutingModule,
  ],
  exports: [
  ],
  declarations: [
    HomePageComponent,
  ],
  providers: [
  ]
})
export class HomePageModule {
}
