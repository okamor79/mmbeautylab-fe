import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {CourseService} from "../../service/course.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {Course} from "../../models/Course";
import {ImageUploadService} from "../../service/image-upload.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add.course.component.html',
  styleUrls: ['./add.course.component.css']
})
export class AddCourseComponent implements OnInit {

  //@ts-ignore
  public courseForm: FormGroup;
  picker: any;
  picker2: any;
  // @ts-ignore
  selectedFile: File;
  previewImgURL: any;

  // @ts-ignore
  createdCourse: Course;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private notification: NotificationService,
    private fb: FormBuilder,

    private imageUploadService: ImageUploadService,

    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.courseForm = this.createCourseAddForm();
  }

  private createCourseAddForm(): FormGroup {
    return this.fb.group({
      uniqueCode: ['', Validators.compose([Validators.required])],
      courseName: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      fullDescription: ['', Validators.compose([Validators.required])],
      urlCourseVideo: ['', Validators.compose([Validators.required])],
      urlCoursePreview: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      dayAccess: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    this.courseService.createCourse({
      uniqueCode: this.courseForm.value.uniqueCode,
      courseName: this.courseForm.value.courseName,
      description: this.courseForm.value.description,
      fullDescription: this.courseForm.value.fullDescription,
      urlCourseVideo: this.courseForm.value.urlCourseVideo,
      urlCoursePreview: this.courseForm.value.urlCoursePreview,
      price: this.courseForm.value.price,
      startDate: this.courseForm.value.startDate,
      endDate: this.courseForm.value.endDate,
      dayAccess: this.courseForm.value.dayAccess
    }).subscribe(data => {
      this.createdCourse = data;
      if (this.createdCourse.id != null) {
        this.imageUploadService.uploadImageToCourse(this.selectedFile, this.createdCourse.id)
          .subscribe(() => {
            this.notification.showSnakBar('Курс успішно додано');
          })
      }
      this.router.navigate(['admin'])
    },error => {
      this.notification.showSnakBar(error.message);
    })

  }

  // @ts-ignore
  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e) => {
      this.previewImgURL = reader.result;
    };
  }

}
