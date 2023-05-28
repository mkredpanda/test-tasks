import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFormComponent } from "./booking-form.component";

const routes: Routes = [
  {
    path: '',
    component: BookingFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookingFormRoutingModule {
}
