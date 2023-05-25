import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})

export class NotFoundComponent implements OnInit, OnDestroy {
  constructor(
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }
}
