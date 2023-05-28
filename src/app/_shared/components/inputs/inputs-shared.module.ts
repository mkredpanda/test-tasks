import {CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule} from '@angular/core';
import { InputBaseComponent } from './input-base.component';
import { AppCheckboxComponent } from './app-checkbox.component';
import { SvgModule } from "../svg/svg.module";
import { FormsModule } from "@angular/forms";

@Injectable()

@NgModule({
  imports: [
    SvgModule,
    FormsModule,
  ],
    declarations: [
        AppCheckboxComponent,
    ],
    exports: [
        AppCheckboxComponent,
    ],
    providers: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class InputsSharedModule {
}

export { InputBaseComponent };
