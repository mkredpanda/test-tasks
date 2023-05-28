import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultTemplateComponent } from "./templates/default-template/default-template.component";
import { NotFoundComponent } from "./_lazy-modules/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultTemplateComponent,
    loadChildren: () => import('./_lazy-modules/home-page/home-page.module').then(m => m.HomePageModule),
    title: 'Jayride Test Task'
  },
  {
    path: 'booking-form',
    component: DefaultTemplateComponent,
    loadChildren: () => import('./_lazy-modules/jayride-test/booking-form/booking-form.module').then(m => m.BookingFormModule),
    data: {
      breadcrumb: 'Booking Form',
    },
  },
  {
    path: 'travel-report',
    component: DefaultTemplateComponent,
    loadChildren: () => import('./_lazy-modules/jayride-test/travel-report/travel-report.module').then(m => m.TravelReportModule),
    data: {
      breadcrumb: 'Travel Report',
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }



