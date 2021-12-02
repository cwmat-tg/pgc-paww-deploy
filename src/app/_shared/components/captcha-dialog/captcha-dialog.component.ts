import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ConfirmationSettings } from '../../models/user-messages.model';

@Component({
  selector: 'app-captcha-dialog',
  templateUrl: './captcha-dialog.component.html',
  styleUrls: ['./captcha-dialog.component.scss']
})
export class CaptchaDialogComponent implements OnInit {
  // Config
  siteKey = environment.captchaSiteKey;
  captchaValid = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationSettings
  ) { }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);

    if (captchaResponse)
      this.captchaValid = true;
    else
      this.captchaValid = false;
  }

}
