import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const urlAPI = `${environment.urlAPIService}course/`;

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  //@ts-ignore
  public createCourse(course): Observable<any> {
    return this.http.post(urlAPI + 'add', {
      uniqueCode: course.uniqueCode,
      courseName: course.courseName,
      description: course.description,
      fullDescription: course.fullDescription,
      urlCourseVideo: course.urlCourseVideo,
      urlCoursePreview: course.urlCoursePreview,
      price: course.price,
      startDate: course.startDate,
      endDate: course.endDate,
      dayAccess: course.dayAccess,
      discount: 1
    })
  }

  getAllCourse(): Observable<any> {
    return this.http.get(urlAPI+'all');
  }

  // @ts-ignore
  changeCourseStatus(id): Observable<any> {
    return this.http.get(urlAPI + id + '/changeStatus');
  }

  // @ts-ignore
  courseInfo(id): Observable<any> {
    return this.http.get(urlAPI + id + '/info');
  }

  // @ts-ignore
  generateButton(id): Observable<any> {
    return this.http.get(urlAPI + id + '/genbut');
  }

}
