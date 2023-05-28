import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TravelReportComponent } from "./travel-report.component";
import { TravelReportRoutingModule } from "./travel-report-routing.module";
import { PipesModule } from "../../../_core/pipes/pipes.module";
import { TableListModule } from "../../../_shared/components/table-list/table-list.module";

@NgModule({
  imports: [
    CommonModule,
    TravelReportRoutingModule,
    PipesModule,
    TableListModule
  ],
  declarations: [
    TravelReportComponent
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TravelReportModule {
}
