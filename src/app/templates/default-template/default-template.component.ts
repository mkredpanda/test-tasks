import { Component, OnInit } from '@angular/core';
import { PageLayoutService } from '../../_core/services/page-layout.service';

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss'],
})
export class DefaultTemplateComponent implements OnInit {
  public isWebview: boolean = this._pageLayoutService.layoutType === 'webview';

  constructor(
    private _pageLayoutService: PageLayoutService,
  ) {
  }

  ngOnInit(): void {
  }
}
