import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {Course} from "../../models/Course";
import {CourseService} from "../../service/course.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {SaleService} from "../../service/sale.service";
import {Sales} from "../../models/Sales";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AdminComponent implements OnInit, OnDestroy {

  displayedColumns: any[] = ['fullName', 'username', 'phone', 'role'];

  dispColsSales = ['orderId', 'datePayment', 'orderAmount', 'status'];

  columns = [
    {
      columnDef: 'orderId',
      header: 'Код замовлення',
      cell: (e: Sales) => `${e.orderId}`
    },
    {
      columnDef: 'datePayment',
      header: 'Дата та час оплати',
      cell: (e: Sales) => `${e.datePayment}`
    },
    {
      columnDef: 'orderAmount',
      header: 'Сплачена вартість, грн.',
      cell: (e: Sales) => `${e.orderAmount}`
    },
    {
      columnDef: 'status',
      header: 'Статус замовлення',
      cell: (e: Sales) => `${e.status}`
    }

  ]

  colSales = this.columns.map(c => c.columnDef);

   dispColsSalesWithExpand = [...this.colSales, 'expand'];
  // dispColsSalesWithExpand = [...this.dispColsSales, 'expand'];

  // @ts-ignore
  expandedElement: Sales | null;

  // @ts-ignore
  userList: User[];

  courseCount: number = 0;
  salesCount: number = 0;

  // @ts-ignore
  sales: Sales[];
  //@ts-ignore
  courseList: Course[];
  // @ts-ignore
  currUser: User;
  private interval: any;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private imageService: ImageUploadService,
    private saleService: SaleService,
    private notification: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.userService.getAllUser()
      .subscribe(data => {
        this.userList = data;
        if (data.authorities.authority === 'ROLE_ADMIN') {
            data.authorities[0].authority = "Адміністратор";
        } else {
          data.authorities[0].authority = "Користувач";
        }
        this.userList = data;
      })
    this.courseService.getAllCourse()
      .subscribe(data => {
        this.courseList = data;
        this.courseCount = data.length;
        if (this.courseList) {
          this.getImagesToCourse(this.courseList);
        }
      });

    this.saleService.getAllOrders()
      .subscribe(data => {
          this.sales = data;
          this.salesCount = data.length
        }
      )

    this.userService.getCurrentUser()
      .subscribe(data => {
        this.currUser = data
        // @ts-ignore
        this.currUser.role = data.authority;
      })

    this.interval = setInterval(() => {
      this.userService.getAllUser()
        .subscribe(data => {
          this.userList = data;
        })
      this.saleService.getAllOrders()
        .subscribe(data => {
          if (this.salesCount != data.length) {
            this.sales = data;
            this.salesCount = data.length;
          }
        })
      this.courseService.getAllCourse()
        .subscribe(data => {
          if (this.courseCount != data.length) {
            this.courseList = data;
            this.courseCount = data.length;
            if (this.courseList) {
              this.getImagesToCourse(this.courseList);
            }
          }
        });

      this.userService.getCurrentUser()
        .subscribe(data => {
          this.currUser = data
          // @ts-ignore
          this.currUser.role = data.authority;
        })
    },1000);

  }

  // @ts-ignore
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

  // @ts-ignore
  showAlert(val): void {
    this.notification.showSnakBar(val);
  }

  // @ts-ignore
  changeCourseStatus(id): void {
    this.courseCount = this.courseCount + 1;
    this.courseService.changeCourseStatus(id).subscribe(() => {

    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }


}
