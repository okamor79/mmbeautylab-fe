import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snakbar: MatSnackBar) { }

  public showSnakBar(message: string): void {
    // @ts-ignore
    this.snakbar.open(message, null, {
      duration: 2000
    });
  }
}
