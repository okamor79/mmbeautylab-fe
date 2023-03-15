import {Component, Injectable, Input} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  // @ts-ignore
  @Input() courseId: number;
  private routeSubscript: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,


) {
    this.routeSubscript = route.params.subscribe(p => {
      this.courseId = p['id']
    });

  }


}
