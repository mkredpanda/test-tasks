import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TableConfig } from "../../../_shared/components/table-list/table-list";
import { TravelReportInterface } from "./travel-report.interface";
import { Subscription } from "rxjs";
import { TableListComponent } from "../../../_shared/components/table-list/table-list.component";

@Component({
  selector: 'app-travel-report',
  templateUrl: './travel-report.component.html',
  styleUrls: ['./travel-report.component.scss']
})
export class TravelReportComponent implements OnInit, OnDestroy {
  @ViewChild(TableListComponent) tableList: TableListComponent | undefined;

  public animate: boolean = false;
  public currentPage: number = 1;
  public perPage: number = 10;

  public tableConfig: TableConfig = {
    columns: [
      {
        columnTitle: 'Name',
        propertyPath: 'name',
        fallbackValue: 'Не заповнено',
        sortable: true,
        filterOperator: 'like',
      },
      {
        columnTitle: 'Vehicle Type',
        propertyPath: 'vehicleType.name',
        fallbackValue: 'Не заповнено',
        sortable: true,
        filterOperator: 'like',
      },
      {
        columnTitle: 'Price per Passenger',
        propertyPath: 'pricePerPassenger',
        fallbackValue: 'Не заповнено',
        sortable: true,
        filterOperator: 'is',
      },
    ],
  };
  public sortDir: string = 'asc';
  public sortColumn: string = 'pricePerPassenger';

  public initialQueryFilters = [
    {
      filterName: 'page',
      filterValue: 1,
    },
    {
      filterName: 'limit',
      filterValue: 10,
    },
    {
      filterName: 'sort[dir]',
      filterValue: this.sortDir,
    },
    {
      filterName: 'sort[column]',
      filterValue: this.sortColumn,
    }
  ];

  public travelReport: TravelReportInterface[] = [];
  public totalListings: number = 0;
  public minPrice: number = 0;
  public maxPrice: number = 0;
  public averagePrice: number = 0;
  public selectedPassengers: number = 3;
  public totalRec: number = 0;

  private _subscriptions$ = new Subscription();

  constructor(
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      // @ts-ignore
      this.tableList.endpoint = `https://jayridechallengeapi.azurewebsites.net/api/QuoteRequest`;
      // @ts-ignore
      this.tableList.loadData();
    }, 50);
  }

  ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }

  public dataChange(travelOptions: TravelReportInterface[]): void {
    this.travelReport = [];
    if (travelOptions.length) {
      this.travelReport = travelOptions.filter(value => value.vehicleType.maxPassengers >= this.selectedPassengers)
      .sort((a, b) => a.pricePerPassenger - b.pricePerPassenger)
      this.totalListings = this.travelReport.length;
      this.minPrice = Math.min(...this.travelReport.map(option => option.pricePerPassenger));
      this.maxPrice = Math.max(...this.travelReport.map(option => option.pricePerPassenger));
      this.averagePrice = this.travelReport.reduce((total, option) => total + option.pricePerPassenger, 0) / this.travelReport.length;
      this.totalRec = travelOptions.length;
    }
  }
}
