import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  public loginForm: FormGroup;


  constructor(
    private dialog: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);

      this.router.navigate(['/']);
      window.location.reload();
    }, error => {
      console.log(error);
      this.notificationService.showSnakBar(error.message);
    });
  }

  regisreRedirect(): void {
    this.dialog.close();
    this.router.navigate(['/register']);
  }

  // @ts-ignore
  resetPassword(username): void {
    this.authService.resetUserPassword(username).subscribe(() => {
        this.notificationService.showSnakBar("Новий пароль вислано на Вашу скриньку");
      }
    )
  }

}
