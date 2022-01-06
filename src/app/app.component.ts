import { Component } from '@angular/core';
import { AppUpdateService } from './_shared/services/app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pgc-paww-frontend';

  constructor(
    private appUpdate: AppUpdateService,
  ) { 
  }
}
