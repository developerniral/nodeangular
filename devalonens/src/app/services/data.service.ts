import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpParameterEncodingCodec } from './http-parameter-encoding-codec';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getRequest(url: string, params: any): Observable<any> {
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
      , httpParams = new HttpParams({ encoder: new HttpParameterEncodingCodec() });

    url = this._apiUrl + url;

    for (let key in params) {
      let value = params[key];
      httpParams = httpParams.set(key, value);
    }

    return this._http.get(url, { headers: httpHeaders, responseType: 'json', params: httpParams });
  }

  postRequest(url: string, body: any): Observable<any> {
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
      , httpParams = new HttpParams({ encoder: new HttpParameterEncodingCodec() });

    for (const key in body) {
      if (body[key] !== null) {
        httpParams = httpParams.set(key, body[key]);
      }
    }

    url = this._apiUrl + url;
    body = httpParams;

    return this._http.post(url, body, { headers: httpHeaders, responseType: 'json' });
  }

  putRequest(url: string, body: any): Observable<any> {
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
      , httpParams = new HttpParams({ encoder: new HttpParameterEncodingCodec() });

    for (const key in body) {
      if (body[key] !== null) {
        httpParams = httpParams.set(key, body[key]);
      }
    }

    url = this._apiUrl + url;
    body = httpParams;

    return this._http.put(url, body, { headers: httpHeaders, responseType: 'json' });
  }

  patchRequest(url: string, body: any): Observable<any> {
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
      , httpParams = new HttpParams({ encoder: new HttpParameterEncodingCodec() });

    for (const key in body) {
      if (body[key] !== null) {
        httpParams = httpParams.set(key, body[key]);
      }
    }

    url = this._apiUrl + url;
    body = httpParams;

    return this._http.patch(url, body, { headers: httpHeaders, responseType: 'json' });
  }

  deleteRequest(url: string): Observable<any> {
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    url = this._apiUrl + url;
    return this._http.delete(url, { headers: httpHeaders, responseType: 'json' });
  }

  postJson(url: string, data: any): Observable<any> {
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    url = this._apiUrl + url;
    return this._http.post(url, JSON.stringify(data), { headers: httpHeaders, responseType: 'json' });
  }

  putJson(url: string, data: any): Observable<any> {
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    url = this._apiUrl + url;
    return this._http.put(url, JSON.stringify(data), { headers: httpHeaders, responseType: 'json' });
  }

  postFormObject(url: string, params: any): Observable<any> {
    url = this._apiUrl + url;
    const formData = new FormData();

    if (params.hasOwnProperty('file')) {
      let files = params['file'];
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          formData.append('file[]', file, file['name']);
        }
      } else {
        formData.append('file', files, files['name']);
      }
    }
    for (let key in params) {
      if (key != 'file') {
        formData.append(key, params[key]);
        //formData.append('ref_table_id', params['ref_table_id']);
      }
    }
    return this._http.post(url, formData, {});
  }

  public apiJson(url: string, params: any): Observable<any> {
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
      , httpParams = new HttpParams({ encoder: new HttpParameterEncodingCodec() });
    for (let key in params) {
      let value = params[key];
      httpParams = httpParams.set(key, value);
    }
    return this._http.get(url, { headers: httpHeaders, responseType: 'json', params: httpParams });
  }

   public postWithCSRFJson(url: string, data: any, CSRF: string): Observable<any> {
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'X-CSRF-TOKEN': CSRF })
      , httpParams = new HttpParams({ encoder: new HttpParameterEncodingCodec() });

   
    url = this._apiUrl + url;
    return this._http.post(url, JSON.stringify(data), { headers: httpHeaders, responseType: 'json' });


  }
}
