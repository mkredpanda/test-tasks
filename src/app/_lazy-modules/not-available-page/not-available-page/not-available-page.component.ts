import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RESPONSE} from '@nguniversal/express-engine/tokens';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { isPlatformServer, Location } from '@angular/common';
import { NotAvailablePageRouteDataInterface } from '../../../_core/interfaces/not-available-page-route-data.interface';

@Component({
  selector: 'app-not-available-page',
  templateUrl: './not-available-page.component.html',
  styleUrls: ['./not-available-page.component.scss']
})

export class NotAvailablePageComponent implements OnInit, OnDestroy {
  public status: number | undefined;
  public message: string | undefined;
  public template: 404 | 500 | undefined;

  public NOT_FOUND_CODES = [403, 404, 408, 414, 418];

  public ERRORS_CODES = [500, 502, 503, 504, 509];

  private _subscriptions$ = new Subscription();

  constructor(
    @Inject(RESPONSE) private _response: any,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _route: ActivatedRoute,
    private _location: Location,
  ) {
  }

  public ngOnInit(): void {
    this._subscriptions$.add(
      this._route.data.subscribe((data: NotAvailablePageRouteDataInterface) => {
        if (data && data.errorInfo) {
          this.status = data.errorInfo.status || 404;
          this.message = data.errorInfo.message || '';
          this._determineTemplateByStatus();
        } else {
          this._determineTemplateByUrl();
        }
        this._setResponseStatus();
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }

  private _determineTemplateByStatus(): void {
    if (this.status) {
      if (this.ERRORS_CODES.includes(this.status)) {
        this.template = 500;
      } else if (this.NOT_FOUND_CODES.includes(this.status)) {
        this.template = 404;
      } else {
        this.template = 404;
      }
    }
  }

  private _determineTemplateByUrl(): void {
    const segment = this._location.path().split('/');
    if (segment[2] === '404') {
      this.template = 404;
    } else if (segment[2] === '500') {
      this.template = 500;
    } else {
      this.template = 500;
    }
  }

  private _setResponseStatus(): void {
    if (isPlatformServer(this._platformId)) {
      if (this.status && [...this.ERRORS_CODES, ...this.NOT_FOUND_CODES].includes(Number(this.status))) {
        this._response.status(this.status);
      } else {
        this._response.status(404);
      }
    }
  }
}
