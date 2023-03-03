
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

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
    private fb: FormBuilder,
    private router: Router
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
    this.authService.register(
      {
        username: this.registerForm.value.username,
        fullName: this.registerForm.value.fullName,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword
      }).subscribe( data => {
        this.notification.showSnakBar("Register successfully");
        this.authService.login(data);
      this.router.navigate(['main']);
      window.location.reload();
    }, error => {
        this.notification.showSnakBar(error.message);
    });

  }
}
