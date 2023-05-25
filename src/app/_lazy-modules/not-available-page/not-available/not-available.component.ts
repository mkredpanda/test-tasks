import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotAvailableInfoInterface } from '../not-available-page';

@Component({
  selector: 'app-not-available',
  templateUrl: './not-available.component.html'
})
export class NotAvailableComponent implements OnInit {
  @Input() status: number | undefined;
  @Input() message: string | undefined;

  public info: NotAvailableInfoInterface = {
    title: 'File is too large.',
    status: 0,
    message: '',
  };

  constructor(
    private _route: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.info  = {
      title: this.info.title,
      status: this.status,
      message: this.message,
    };
    switch (this.status) {
      case 500:
      case 509:
        this.info.title = 'There was an error on the server.';
        break;
      case 502:
      case 504:
        this.info.title = 'No connection to the server.';
        break;
      case 503:
        this.info.title = 'Technical works, please try later.';
        break;
      default:
        this.info.title = 'File is too large.';
    }
  }
}
