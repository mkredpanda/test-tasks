import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TableListService {
    constructor(
      private _httpClient: HttpClient,
    ) {
    }

    loadData(endpoint: string, params: any): Observable<any> {
        return this._httpClient.get<any>(endpoint, {
            params: params,
        });
    }

}
