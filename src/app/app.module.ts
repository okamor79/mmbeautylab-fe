import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { IndexComponent } from './layout/index/index.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PublicagreementComponent } from './layout/publicagreement/publicagreement.component';
import { ConfidentComponent } from './layout/confident/confident.component';
import { ReturnComponent } from './layout/return/return.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { AddCourseComponent } from './course/add/add.course.component';
import { AdminComponent } from './layout/admin/admin.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { EditComponent } from './course/edit/edit.component';
import { CourseComponent } from './layout/course/course.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    FooterComponent,
    PublicagreementComponent,
    ConfidentComponent,
    ReturnComponent,
    AddCourseComponent,
    AdminComponent,
    EditComponent,
    CourseComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    IonicModule.forRoot()

  ],
  providers: [authInterceptorProviders, authErrorInterceptorProviders],

  bootstrap: [AppComponent]
})
export class AppModule { }
