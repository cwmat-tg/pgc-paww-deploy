import { UserMessages } from 'src/app/_shared/models/user-messages.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoDialogComponent } from 'src/app/_shared/components/info-dialog/info-dialog.component';
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
    private dialog: MatDialog,
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

  uploadProcessed(confNum: string) {
    this.loadOfflineObservations();
  }

  alluploadsProcessed(confNums: string[]) {
    let bullets = '';
    confNums.forEach(e => {
      bullets = bullets + `<p><strong>${e}</strong></p>`;
    });

    const message = `<p>${UserMessages.BulkUploadConfirmation}<p><div>${bullets}</div>`
    this.dialog.open(InfoDialogComponent, {
      width: '35rem',
      data: { title: MagicStrings.ConfirmationHeader, text: message, confirm: 'Close' },
      disableClose: false
    });
  }

}
