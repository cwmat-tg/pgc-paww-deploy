import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { ApiService } from 'src/app/_shared/services/api.service';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { environment } from 'src/environments/environment';
import * as config from 'src/assets/overrides.json';
import { ConnectionService } from 'src/app/_shared/services/connection.service';

const CONFIG_DATA = config;

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  // Connection check
  isOffline!: boolean;

  // Subs
  isOffline$!: Subscription;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private connectionService: ConnectionService,
  ) {
    this.isOffline = this.connectionService.isOffline;
    this.isOffline$ = this.connectionService.isOffline$().subscribe(res => {
      this.isOffline = res;
    });
  }

  ngOnInit(): void {
    if (environment.useTestApi) {
      // Cache API lookups
      this.cacheEndpoints().subscribe(res => {
        console.log('Cached endpoints');
      });

      // Load any necessary app data and then nav to home
      this.router.navigate(['/app/home']);
    } else {
      if (this.isOffline) {
        // Cache API lookups
        this.cacheEndpoints().subscribe(res => {
          console.log('Cached endpoints');
        });

        // Load any necessary app data and then nav to home
        this.router.navigate(['/app/home']);
      } else {
        // Login
        this.auth.login({username: CONFIG_DATA.pawwU, password: CONFIG_DATA.pawwP}).subscribe(authRes => {
          // Cache API lookups
          this.cacheEndpoints().subscribe(res => {
            console.log('Cached endpoints');
          });

          // Load any necessary app data and then nav to home
          this.router.navigate(['/app/home']);
        });
      }
    }
    
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
