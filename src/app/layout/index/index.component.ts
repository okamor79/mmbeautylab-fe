import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {CourseService} from "../../service/course.service";
import {Router} from "@angular/router";
import {Course} from "../../models/Course";
import {ImageUploadService} from "../../service/image-upload.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

//@ts-ignore
  courses: Course[];
  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private imageService: ImageUploadService
  ) {

  }

  ngOnInit(): void {

    this.courseService.getAllCourse()
      .subscribe(data => {
        this.courses = data;
        if (this.courses) {
          this.getImagesToCourse(this.courses);
        }
      })
  }

  getImagesToCourse(courses: Course[]): void {
    courses.forEach(c => {
      // @ts-ignore
      this.imageService.getImageToCourse(c.id)
        .subscribe(data => {
          c.avatar = data.imageBytes;
        })
    });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
