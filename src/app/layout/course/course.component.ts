import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from "../../service/course.service";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/User";
import {Course} from "../../models/Course";
import {Subscription} from "rxjs";
import {ImageUploadService} from "../../service/image-upload.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "../../auth/login/login.component";
import {SaleService} from "../../service/sale.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  // @ts-ignore
  @Input() courseId: number;
  @Input() user: User | undefined;

  //@ts-ignore
  course: Course;

  //@ts-ignore
  isLogined = false;

  isSaled = false;

  //@ts-ignore
  data: string;
  //@ts-ignore
  signature: string;
  //@ts-ignore
  private routeSubscript: Subscription;

  constructor(
    private dialog: MatDialog,
    private courseService: CourseService,
    private imageService: ImageUploadService,
    private notification: NotificationService,
    private saleService: SaleService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.routeSubscript = route.params.subscribe(p => {
      this.courseId = p['id']
    });

  }

  ngOnInit(): void {
    console.log(this.isLogined)
    if (window.sessionStorage.getItem('auth-user')) {
      this.isLogined = true;
    }
    console.log(this.isLogined)
    this.courseService.courseInfo(this.courseId).subscribe(
      data => {
        this.course = data;
        if (this.course) {
          const id = this.course.id;
          // @ts-ignore
          this.imageService.getImageToCourse(id).subscribe(data => {
            this.course.avatar = data.imageBytes;
          })
          if (this.isLogined === true) {
            this.saleService.checkCourseSale(id).subscribe(data => {
              this.isSaled = data;
              if (data === false) {
                this.courseService.generateButton(id).subscribe(d => {
                    this.data = d.data;
                    this.signature = d.signature;
                  }
                )
              }
            })
          }

        }

      }
    );


  }

  formatImage(img
                :
                any
  ):
    any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  openLoginDialog()
    :
    void {
    const dialogLoginConfig = new MatDialogConfig();
    dialogLoginConfig.width = '30%';
    dialogLoginConfig.height = '32%';
    dialogLoginConfig.data = {};
    this.dialog.open(LoginComponent, dialogLoginConfig);
  }
}
