import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private _dataService: DataService) { }

  public getStaffList(params: any): Observable<any> {
    const url: string = `users`;
    return this._dataService.getRequest(url, {});
  }

  public saveStaff(params: any): Observable<any> {
    const url: string = `users`;
    return this._dataService.postRequest(url, params);
  }
}
