import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationListInterface } from '../../../_core/interfaces/navigation-list.interface';
import { NavsListService } from '../../../_core/services/navs-list.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @ViewChild('headerWrap') headerEl!: ElementRef;

  public showSearchBox: boolean = false;
  public headerNav$: Observable<Array<NavigationListInterface>> | undefined;
  public headerHidden = false;

  private _lastScrollTop = 0;
  private _event: any;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: object,
    private _navsList: NavsListService,
  ) {
  }

  public ngOnInit(): void {
    this.headerNav$ = this._navsList.getNavs('mainHeaderNavs');

    if (isPlatformBrowser(this._platformId)) {
      this._lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    this._event = event;
    if (isPlatformBrowser(this._platformId)) {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const scrollingBottom = st > this._lastScrollTop;
      const headerHeight = this.headerEl.nativeElement.offsetHeight;
      const isBottomOfPage = st + window.outerHeight + 10 > document.body.scrollHeight;

      this.headerHidden = !isBottomOfPage && scrollingBottom && st > headerHeight * 2;

      this._lastScrollTop = st <= 0 ? 0 : st;
    }
  }
}
