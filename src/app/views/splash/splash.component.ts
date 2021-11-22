import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/_shared/services/api.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    // Cache API lookups
    this.cacheEndpoints().subscribe(res => {
      console.log('Cached endpoints');
    });

    // Load any necessary app data and then nav to home
    this.router.navigate(['/app/home']);
  }

  private cacheEndpoints() {
    return forkJoin([
      // Animal Count
      this.api.getAnimalCount(),
      // Species
      this.api.getSpecies(),
      // Yes/No
      this.api.getYesNo(),
      // Age
      this.api.getAge(),
      // Captive
      this.api.getCaptive(),
      // Classification
      this.api.getClassification(),
      // Affiliation
      this.api.getAffiliation()
    ]);
  }

}
