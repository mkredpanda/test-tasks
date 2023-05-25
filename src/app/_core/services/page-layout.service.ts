import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../_core/services/local-storage.service';

export const WEBVIEW_COOKIE_KEY = 'pageLayoutType';
export type PageLayoutType = 'default' | 'webview';

@Injectable({
  providedIn: 'root',
})
export class PageLayoutService {
  private _layoutType: PageLayoutType = 'default';

  get layoutType(): PageLayoutType {
    return this._layoutType;
  }

  constructor(
    private _localStorageService: LocalStorageService,
  ) {
    if (_localStorageService.get('app-version')) {
      this._layoutType = 'webview';
    } else {
      this._layoutType = _localStorageService.get(WEBVIEW_COOKIE_KEY) === 'webview' ? 'webview' : 'default';
    }
  }

  public setPageLayout(type: PageLayoutType): void {
    this._localStorageService.set(WEBVIEW_COOKIE_KEY, type);
    this._layoutType = type;
  }
}
