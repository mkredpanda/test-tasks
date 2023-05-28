import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TableConfig } from './table-list';
import { TableListService } from './table-list.service';

const queryMapper = (arr1: any[], arr2: any[]) => {
  return arr1.map(obj => arr2.find(o => o?.filterName === obj?.filterName) || obj);
};

@Component({
  selector: 'app-table-list',
  templateUrl: 'table-list.component.html',
  styleUrls: ['table-list.component.scss'],
})
export class TableListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content', {read: ElementRef, static: true}) content!: ElementRef;

  @Input() animation!: boolean;
  @Input() isTransformDataNeeded = false;
  @Input() config!: TableConfig;
  @Input() currentPage!: number;
  @Input() data: Object[] = [];
  @Input() enableSelect!: boolean;
  @Input() endpoint!: string;
  @Input() hideLastColumn!: boolean;
  @Input() hidePaginator!: boolean;
  @Input() pages!: number;
  @Input() perPage!: number;
  @Input() total!: number;
  @Input() queryFilters!: any;
  @Input() sortColumn!: string;
  @Input() sortDir!: string;
  @Input() additionalData = false;
  @Input() hasData = false;
  @Input() isDocuments = false;
  @Output() dataChange = new EventEmitter<any[]>();
  @Output() selectChange = new EventEmitter();
  @Output() filterChange = new EventEmitter<{ [p: string]: any }>();
  @Output() rowClick = new EventEmitter<any>();

  public checkBoxControl = new FormControl(false);

  public paginatorForm = new FormGroup({
    limit: new FormControl(20),
  });

  private _subscriptions$ = new Subscription();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _tableService: TableListService,
  ) {
  }

  ngOnInit(): void {
    this.subscribeForRouter();
    this._subscribeOnPaginatorLimit();
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  onSelect(event: any): void {
    this.selectChange.emit(event);
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onSort(propertyPath: string): void {
    if (this.sortColumn !== propertyPath) {
      this.sortColumn = propertyPath;
      this.sortDir = 'desc';
    } else {
      this.sortDir = this.sortDir === 'desc' ? 'asc' : 'desc';
    }

    const sortArray = [
      {
        filterName: 'sort[dir]',
        filterValue: this.sortDir,
      },
      {
        filterName: 'sort[column]',
        filterValue: this.sortColumn,
      },
    ];

    for (const filter of this.queryFilters) {
      if (typeof filter !== 'undefined') {
        this.queryFilters = queryMapper(this.queryFilters, sortArray);
      }
    }

    this.loadData();
  }

  nextPage(): void {
    if (this.currentPage < this.pages) {
      const page = [
        {
          filterName: 'page',
          filterValue: this.currentPage + 1,
        },
      ];
      this.queryFilters = queryMapper(this.queryFilters, page);

      this.loadData();
    }
  }

  prevPage(): void {
    if (Number(this.currentPage) !== 1) {
      const page = [
        {
          filterName: 'page',
          filterValue: this.currentPage - 1,
        },
      ];
      this.queryFilters = queryMapper(this.queryFilters, page);

      this.loadData();
    }
  }

  _subscribeOnPaginatorLimit(): void {
    this._subscriptions$.add(
      this.paginatorForm.controls['limit'].valueChanges.subscribe(limit => {
        const perPage = [
          {
            filterName: 'page',
            filterValue: 1,
          },
          {
            filterName: 'limit',
            filterValue: Number(limit),
          },
        ];
        this.queryFilters = queryMapper(this.queryFilters, perPage);
        this.loadData();
      }),
    );
  }

  subscribeForRouter() {
    this._subscriptions$.add(
      this._activatedRoute.queryParams.subscribe(params => {
        if (Object.values(params).length > 0) {
          this.currentPage = Number(params['page']) || 1;
          this.perPage = Number(params['limit']) || 20;

          const queryFilters = [];

          for (const prop in params) {
            if (params.hasOwnProperty(prop)) {

              if (prop.split(']').length === 3) { // если есть оператор фильтрации
                queryFilters.push({
                  filterName: prop.split(']')[0] + ']',
                  filterValue: params[prop],
                  filterOperator: prop.split(']')[1].replace('[', ''),
                });
              } else {
                queryFilters.push({
                  filterName: prop,
                  filterValue: params[prop],
                });
              }
            }
          }

          this.paginatorForm.patchValue({
            limit: this.perPage || 20,
          }, {emitEvent: false});

          this.queryFilters = queryFilters;
        }

      }),
    );
  }

  public loadData(): void {
    if (this.endpoint) {
      const queryParams = {};

/*
      for (const filter of this.queryFilters) {
        if (typeof filter !== 'undefined') {

          if (filter.filterOperator) {
            // @ts-ignore
            queryParams[`${filter.filterName}[${filter.filterOperator}]`] = filter.filterValue;
          } else {
            // @ts-ignore
            queryParams[`${filter.filterName}`] = filter.filterValue;
          }

          if (
            queryParams[`${filter.filterName}`] === '' ||
            queryParams[`${filter.filterName}`] === 'undefined' ||
            queryParams[`${filter.filterName}[${filter.filterOperator}]`] === '' ||
            queryParams[`${filter.filterName}[${filter.filterOperator}]`] === 'undefined'
          ) {
            delete queryParams[`${filter.filterName}`];
            delete queryParams[`${filter.filterName}[${filter.filterOperator}]`];
          }
        }
      }
*/

        this._subscriptions$.add(
          this._tableService.loadData(this.endpoint, queryParams).subscribe((response: any) => {
            this.data = response.listings;
            this.pages = response.last_page || 1;
            this.total = Array.isArray(this.data) ? this.data.length : 0;
            this.hasData = this.total !== 0;
            this.dataChange.emit(this.data);
          }),
        );
    }
  }

  ngOnDestroy(): void {
    this.endpoint = '';
    this.queryFilters = [];
    this._subscriptions$.unsubscribe();
  }
}
