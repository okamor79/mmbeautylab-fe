import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

 const urlAPI = `${environment.urlAPIService}auth/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  public login(user) : Observable<any> {
    return this.http.post(urlAPI + 'signin', {
       username: user.username,
       password: user.password
     })
  }

  // @ts-ignore
  public register(user): Observable<any> {
     return this.http.post(urlAPI + 'signup', {
       username: user.username,
       fullName: user.fullName,
       phone: user.phone,
       password: user.password,
       confirmPassword: user.confirmPassword

     })
  }

  // @ts-ignore
  public resetUserPassword(username): Observable<any> {
    console.log(username)

    return this.http.post(urlAPI + username + '/reset','');
  }
}
