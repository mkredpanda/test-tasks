import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceService } from '../../_core/services/device.service';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.сss'],
})
export class HomePageComponent implements OnInit, OnDestroy {


  public startSliceIndex = 0;
  public endSliceIndex = 3;

  public isMobile!: boolean;
  public isTablet!: boolean;
  public isDesktop!: boolean;
  public min768!: boolean;

  public advantagesPageIndex = 0;
  public advantagesMaxIndex = 2;
  private _interval$: NodeJS.Timeout | undefined;

  private _subscriptions$ = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private _platformId: {},
    private _deviceS: DeviceService,
    private _sanitizer: DomSanitizer,
    private _breakPointObserver: BreakpointObserver,
  ) {
  }
  public ngOnInit(): void {
    this._breakPointSubscribe();
  }

  public ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }

  public prevAdvantages(): void {
    if (this.advantagesPageIndex !== 0) {
      clearInterval(this._interval$);
      this.advantagesPageIndex--;
      this.startSliceIndex--;
      this.endSliceIndex--;
      this._initAdvantagesAutoScrolling();
    }
  }

  private _breakPointSubscribe(): void {
    this.isMobile = this._breakPointObserver.isMatched('(min-width: 360px) and (max-width: 767px)');
    this.isTablet = this._breakPointObserver.isMatched('(min-width: 768px) and (max-width: 1215px)');
    this.isDesktop = this._breakPointObserver.isMatched('(min-width: 1216px)');
    this.min768 = this._breakPointObserver.isMatched('(min-width: 768px)');

    if (this.isMobile) {
      this.advantagesMaxIndex = 4;
      this.endSliceIndex = 1;
    }

    if (this.isTablet) {
      this.advantagesMaxIndex = 3;
      this.endSliceIndex = 2;
    }

    if (this.isDesktop) {
      this.advantagesMaxIndex = 2;
      this.endSliceIndex = 3;
    }

    this._initAdvantagesAutoScrolling();
  }

  private _initAdvantagesAutoScrolling(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._interval$ = setInterval(() => {
        if (this.advantagesPageIndex !== this.advantagesMaxIndex) {
          this.advantagesPageIndex++;
          this.startSliceIndex++;
          this.endSliceIndex++;
        } else {
          this.advantagesPageIndex = 0;
          this.startSliceIndex = 0;

          if (this.isDesktop) {
            this.endSliceIndex = 3;
          }

          if (this.isTablet) {
            this.endSliceIndex = 2;
          }

          if (this.isMobile) {
            this.endSliceIndex = 1;
          }

        }
      }, 5000);
    }
  }

}

