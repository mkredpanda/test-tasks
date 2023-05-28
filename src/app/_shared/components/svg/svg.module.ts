import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SvgComponent} from './svg.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SvgComponent
  ],
  exports: [
    CommonModule,
    SvgComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class SvgModule {
}

