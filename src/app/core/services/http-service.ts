import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private urlBase = environment.apiUrl + '/api';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private options = { headers: this.headers };
  private http = inject(HttpClient);

  handleError(error: any) {
    const err = {
      message: '',
      code: error.status
    };
    if ('string' === typeof error.error) {
      err.message = error.error;
    } else if (error?.error?.errors?.Password && error.error.errors.Password.length > 0) {
      err.message = error.error.errors.Password[0];
    } else {
      err.message = 'Something went wrong.'
    }

    return throwError(err);
  }

  public get(url: string, params = null) {
    const options = { headers: this.headers, params: null, };
    if (params) {
      options.params = params;
    }
    return this.http.get(`${this.urlBase}/${url}`, this.options).pipe(
      catchError(this.handleError)
    );
  }

  public getWithQueryParams(url: string, params: any = null) {
    const options = { headers: this.headers, params: null, };
    if (params) {
      options.params = params;
    }
    return this.http.get(`${this.urlBase}/${url}` + this.getQueryString(params)).pipe(
      catchError(this.handleError)
    );
  }

  public post<TRequest = any, TResponse = any>(url: string, body: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.urlBase}/${url}`, body, this.options).pipe(
      catchError(this.handleError)
    );
  }

  public postWithQueryParams(url: string, body: any, params: any) {
    return this.http.post(`${this.urlBase}/${url}` + this.getQueryString(body), params, this.options).pipe(
      catchError(this.handleError)
    );
  }

  public postWithMultipart(url: string, body: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    const options = { headers: headers };
    return this.http.post(`${this.urlBase}/${url}`, body, options).pipe(
      catchError(this.handleError)
    );
  }

  public UploadFile(url: string, body: any) {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    const options = { headers: headers };
    return this.http.post(`${this.urlBase}/${url}`, body, options).pipe(
      catchError(this.handleError)
    );
  }
  public ImportFile(url: string,params:any = null) {
    let query =params ? this.getQueryString(params) :'';
    url =`${this.urlBase}/${url}${query}`;
    return this.http.get(url ,{
      responseType: 'blob' 
    }).pipe(
      catchError(this.handleError)
    );
  }

  public put(url: string, body: any) {
    return this.http.put(`${this.urlBase}/${url}`, body, this.options).pipe(
      catchError(this.handleError)
    );
  }

  public delete(url: string, params = null) {
    const options = { headers: this.headers, params: null, };
    if (params) {
      options.params = params;
    }
    return this.http.delete(`${this.urlBase}/${url}` + ((params != null) ? this.getQueryString(params) : '')).pipe(
      catchError(this.handleError)
    );
  }

  getQueryString = (obj: any) => {
    const qp = new URLSearchParams();
    Object.keys(obj).forEach(el => {
      qp.set(el, obj[el]);
    });
    return '?' + qp.toString();
  }
}
