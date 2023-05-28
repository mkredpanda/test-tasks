import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelReportComponent } from "./travel-report.component";

const routes: Routes = [
  {
    path: '',
    component: TravelReportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TravelReportRoutingModule {
}
