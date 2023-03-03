import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "../../auth/login/login.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAdmin = false;
  isLoggedIn = false;
  isDataLoaded = false;
  // @ts-ignore
  user: User;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if(this.isLoggedIn) {
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
          if (this.user && (data.authorities[0].authority) === 'ROLE_ADMIN') {
            this.isAdmin = true;
          }

        })
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  openLoginDialog(): void {
    const dialogLoginConfig = new MatDialogConfig();
    dialogLoginConfig.width = '30%';
    dialogLoginConfig.height = '32%';
    dialogLoginConfig.data = {

    };
    this.dialog.open(LoginComponent,dialogLoginConfig);
  }

}
