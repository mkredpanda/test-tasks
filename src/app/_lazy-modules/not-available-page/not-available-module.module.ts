import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAvailableModuleRoutes } from './not-available-module.routes';
import { NotAvailableComponent } from './not-available/not-available.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAvailableModuleComponent } from './not-available-module.component';
import { NotAvailablePageComponent } from './not-available-page/not-available-page.component';

@NgModule({
  imports: [
    NotAvailableModuleRoutes,
    CommonModule,
  ],
  exports: [
  ],
  declarations: [
    NotAvailableComponent,
    NotFoundComponent,
    NotAvailableModuleComponent,
    NotAvailablePageComponent
  ],
  providers: [
  ]
})
export class NotAvailableModuleModule {
}

