import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Load any necessary app data and then nav to home
    this.router.navigate(['/app/home']);
  }

}
