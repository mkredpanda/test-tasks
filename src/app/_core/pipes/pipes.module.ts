import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPropertyByPathPipe } from './get-property-by-path.pipe';
import { CallPipesPipe } from "./call-pipes.pipe";

@NgModule({
  declarations: [
    GetPropertyByPathPipe,
    CallPipesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetPropertyByPathPipe,
    CallPipesPipe
  ]
})
export class PipesModule {
}
