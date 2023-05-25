import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotAvailablePageComponent} from "./not-available-page/not-available-page.component";

export const routes: Routes = [
  {
    path: '',
    component: NotAvailablePageComponent,
  },
/*
  {
    path: '404',
    component: NotAvailableModuleComponent
  },
  {
    path: '500',
    component: NotAvailableModuleComponent
  },
*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotAvailableModuleRoutes { }
