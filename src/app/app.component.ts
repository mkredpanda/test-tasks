import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageLayoutService } from './_core/services/page-layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _subscriptions$ = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private _platformId: {},
    @Inject(DOCUMENT) private _document: Document,
    private _activatedRoute: ActivatedRoute,
    private _pageLayoutService: PageLayoutService,
  ) {
  }

  public ngOnInit(): void {
    this._subscribeForQueryParams();

    if (isPlatformBrowser(this._platformId)) {
      const script = document.getElementById('unsupported-browsers-script-id');
      const modalId = document.getElementById('unsupported-browsers-modal-id');
      if (script && modalId) {
        document.body.removeChild(script);
        document.body.removeChild(modalId);
      }
    }
  }

  public ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }

  private _subscribeForQueryParams(): void {
    this._subscriptions$.add(
      this._activatedRoute.queryParams.subscribe(params => {
        if (params.hasOwnProperty('page')) {
          this._pageLayoutService.setPageLayout(params['page'] === 'webview' ? 'webview' : 'default');
        }
      }),
    );
  }
}

