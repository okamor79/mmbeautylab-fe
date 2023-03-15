import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const urlAPI = `${environment.urlAPIService}sale/`;
@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) {
  }

  getAllOrders(): Observable<any> {
    return this.http.get(urlAPI + 'all');
  }

  getUserOrders(): Observable<any> {
    return this.http.get(urlAPI + 'userorders');
  }

  checkCourseSale(id: any): Observable<any> {
    return this.http.get(urlAPI + id + '/check');
  }

  expireCountDay(id: any): Observable<any> {
    return this.http.get(urlAPI + id + '/expire');
  }

  }
