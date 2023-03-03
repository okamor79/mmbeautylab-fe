import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
// @ts-ignore

const urlAPI = `${environment.urlAPIService}user/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get(urlAPI + id );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(urlAPI);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(urlAPI + 'update', user);
  }

  getAllUser(): Observable<any> {
    return this.http.get(urlAPI+'list');
  }



}
