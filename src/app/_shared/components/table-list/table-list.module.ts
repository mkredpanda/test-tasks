import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { TableListComponent } from './table-list.component';
import { InputsSharedModule } from '../inputs/inputs-shared.module';
import { PipesModule } from "../../../_core/pipes/pipes.module";
import { SvgModule } from "../svg/svg.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    InputsSharedModule,
    PipesModule,
    SvgModule,
    ReactiveFormsModule,
  ],
  providers: [],
  declarations: [
    TableListComponent
  ],
  exports: [
    TableListComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class TableListModule {
}
