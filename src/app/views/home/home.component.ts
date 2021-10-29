import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

  appName = MagicStrings.AppName;
  appAbbrev = MagicStrings.AppAbbrev;

  constructor(
    private router: Router,
  ) { }

  createObservation() {
    this.router.navigate(['/app/observation']);
  }

}
