import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import * as http from "http";

const AUTH_API = 'http://localhost:8080/auth/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  public login(user) : Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    })
  }

  // @ts-ignore
  public register(user): Observable<any> {
     return this.http.post(AUTH_API + 'signup', {
       username: user.username,
       fullname: user.fullname,
       phone: user.phone,
       password: user.password,
       confirmPassword: user.confirmPassword

     })
  }
}
