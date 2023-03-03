import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {PublicagreementComponent} from "./layout/publicagreement/publicagreement.component";
import {ReturnComponent} from "./layout/return/return.component";
import {ConfidentComponent} from "./layout/confident/confident.component";
import {AdminComponent} from "./layout/admin/admin.component";
import {AddCourseComponent} from "./course/add/add.course.component";
import {CourseComponent} from "./layout/course/course.component";
import {AuthGuardService} from "./helper/auth-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},
   {path: 'main', component: IndexComponent},
  {path: 'public', component: PublicagreementComponent},
  {path: 'return', component: ReturnComponent},
  {path: 'confident', component: ConfidentComponent},
  {path: 'add-course', component: AddCourseComponent, canActivate: [AuthGuardService]},
  {path: 'course/:id', component: CourseComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
   {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
