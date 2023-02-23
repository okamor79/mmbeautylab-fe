import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  public registerForm: FormGroup;


  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notification: NotificationService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }


  private createRegisterForm(): FormGroup {
    return this.fb.group({
        username: ['', Validators.compose([Validators.required, Validators.email])],
        fullName: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.required])]
      });
  }

  submit(): void {
    console.log(this.registerForm.value);

    this.authService.register(
      {
        username: this.registerForm.value.username,
        fullName: this.registerForm.value.fullName,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword
      }).subscribe( data => {
        this.notification.showSnakBar("Register successfully");
    }, error => {
        this.notification.showSnakBar(error.message);
    })
  }
}
