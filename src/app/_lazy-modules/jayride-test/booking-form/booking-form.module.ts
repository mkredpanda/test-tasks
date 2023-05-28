import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BookingFormComponent } from "./booking-form.component";
import { CommonModule } from "@angular/common";
import { BookingFormRoutingModule } from "./booking-form-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    BookingFormRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    BookingFormComponent
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BookingFormModule {
}
