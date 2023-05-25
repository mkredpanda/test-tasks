import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NavigationListInterface } from '../interfaces/navigation-list.interface';

export interface NavsObjectInterface {
  mainHeaderNavs: NavigationListInterface[];
}

@Injectable({
  providedIn: 'root'
})
export class NavsListService {

  private _navsObject: NavsObjectInterface | undefined;
  private _navsList$: BehaviorSubject<NavsObjectInterface>;

  constructor(
  ) {
    this._navsList$ = new BehaviorSubject<NavsObjectInterface>(this._getNavsObject());
  }

  public getNavs(navsName: any): Observable<NavigationListInterface[]> {
    // @ts-ignore
    return this._navsList$.pipe(map((object: NavsObjectInterface) => object[navsName]));
  }

  private _getNavsObject(): NavsObjectInterface {
  this._navsObject = {
    mainHeaderNavs: this._mainHeaderNavs(),
  };
  return this._navsObject;
  }

  private _mainHeaderNavs(): any[] {
    return [
      {
        site: true,
        seoUrl: true,
        label: 'New User',
        href: `/new`,
      },
      {
        site: true,
        label: 'List Users',
        href: '/list_users',
      },
    ];
  }

}
