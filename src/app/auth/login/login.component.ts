import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  // @ts-ignore
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenStrogare: TokenStorageService,
    private notification: NotificationService,
    private router: Router,
    private fb: FormBuilder) {

    if (this.tokenStrogare.getUser()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      this.tokenStrogare.saveToken(data);
      this.tokenStrogare.saveUser(data);

      this.notification.showSnakBar('Success login');
 //     this.router.navigate(['/']);
      window.location.reload();
    }, error => {
      console.log(error);
      this.notification.showSnakBar(error.message);
    })
  }

}
