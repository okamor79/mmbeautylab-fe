import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const urlAPI = `${environment.urlAPIService}image/`;

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.post(urlAPI + 'upload', uploadData);
  }

  uploadImageToCourse(file: File, courseId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.post(urlAPI + courseId + '/upload', uploadData);
  }

  getProfileImage(): Observable<any> {
    return this.http.get(urlAPI + 'profileImage');
  }

  getImageToCourse(courseId: number): Observable<any> {
    return this.http.get(urlAPI + courseId + '/image');
  }
}
