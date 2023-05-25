import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultTemplateComponent} from "./templates/default-template/default-template.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultTemplateComponent,
    loadChildren: () => import('./_lazy-modules/home-page/home-page.module').then(m => m.HomePageModule),
    data: {
      part: 'home',
      redirectAfterLogin: true,
    },
  },
  {
    path: 'not-available-page-url',
    component: DefaultTemplateComponent,
    loadChildren: () => import('./_lazy-modules/not-available-page/not-available-module.module').then(m => m.NotAvailableModuleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})


export class AppRoutingModule { }



