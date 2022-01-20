import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tratadorDeErros } from '../utils/httputils';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(tratadorDeErros));
  }
}
