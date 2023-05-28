import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './_shared/components/app-header/app-header.component';
import { AppFooterComponent } from './_shared/components/app-footer/app-footer.component';
import { DefaultTemplateComponent } from "./templates/default-template/default-template.component";
import { TitleStrategy } from "@angular/router";
import { TemplatePageTitleStrategy } from "./_core/services/title-strategy.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from "./_lazy-modules/not-found/not-found.component";
import { DeviceService } from "./_core/services/device.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    DefaultTemplateComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy
    },
    DeviceService,
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
