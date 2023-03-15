import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // @ts-ignore
  public profileForm: FormGroup;

  // @ts-ignore
  currentUser: User;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
  this.userService.getCurrentUser().subscribe(data => {
    this.currentUser = data;
  })
  }

  ngOnInit(): void {
    this.profileForm = this.createProfileForm();
  }

  private createProfileForm(): FormGroup {
    return this.fb.group(
      {
        username: ['', []],
        fullName: [this.currentUser.fullName,[]],
        phone: [''],
        password: [''],
        confirmPassword: ['']
      });
  }

  submit() {
    console.log(this.currentUser);
  }
}
