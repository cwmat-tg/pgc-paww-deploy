import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';
import { ObservationDtoContainer } from 'src/app/_shared/models/observation.model';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  // Config
  appName = MagicStrings.AppName;
  appAbbrev = MagicStrings.AppAbbrev;

  // Offline observations
  offlineObs: ObservationDtoContainer[]  = [];
  offlineObsCount: number = 0;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.loadOfflineObservations();
  }

  createObservation() {
    this.router.navigate(['/app/observation']);
  }

  async loadOfflineObservations() {
    this.offlineObs = await this.localStorageService.getObservations();
    this.offlineObsCount = this.offlineObs.length;
  }

  uploadProcessed() {
    this.loadOfflineObservations();
  }

}
