import { UserMessages } from 'src/app/_shared/models/user-messages.model';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoDialogComponent } from 'src/app/_shared/components/info-dialog/info-dialog.component';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';
import { ObservationConfirmatonVm, ObservationDtoContainer } from 'src/app/_shared/models/observation.model';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { ApiService } from 'src/app/_shared/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  // Config
  appName = MagicStrings.AppName;
  appAbbrev = MagicStrings.AppAbbrev;
  isSuperZoom = false;

  // Offline observations
  offlineObs: ObservationDtoContainer[]  = [];
  offlineObsCount: number = 0;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.loadOfflineObservations();
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log('Resize', event);
    const estimateZoom = (( window.outerWidth - 10 ) / window.innerWidth) * 100;
      if (estimateZoom >= 300)
        this.isSuperZoom = true;
      else
        this.isSuperZoom = false;
  }

  createObservation() {
    this.router.navigate(['/app/observation']);
  }

  async loadOfflineObservations() {
    this.offlineObs = await this.localStorageService.getObservations();
    this.offlineObsCount = this.offlineObs.length;
  }

  uploadProcessed(confNum: ObservationConfirmatonVm) {
    this.loadOfflineObservations();
  }

  async alluploadsProcessed(confNums: ObservationConfirmatonVm[]) {
    // Get species list for VM
    const speciesList = await this.api.getSpecies().toPromise();

    if (speciesList) {
      confNums = confNums.map(e => {
        const SpeciesName = speciesList.find(x => e.SpeciesId === x.SpeciesId)?.Name;
        return { ...e, SpeciesName };
      });
    }

    //  Break into core lists based on the necessary action
    const actionList = confNums.filter(e => e.ConfirmationAction === MagicStrings.ConfFreshActionNeeded);
    const noActionList = confNums.filter(e => e.ConfirmationAction === MagicStrings.ConfFreshNoAction);
    const staleList = confNums.filter(e => e.ConfirmationAction === MagicStrings.ConfStale);

    // Create HTML for each section
    const actionHtml = this.createUploadSection(actionList);
    const noActionHtml = this.createUploadSection(noActionList);
    const staleHtml = this.createUploadSection(staleList);

    // Create final message
    let message = `
      <div class="appConfirmTop">${UserMessages.BulkUploadConfirmation}</div>
    `;

    if (noActionList.length > 0 || staleList.length > 0) {
      message = message + `
      <h1 class="appUploadHeader">${MagicStrings.ConfirmationHeaderNoActionNeeded}</h1>
      <div class="appUploadMessage">${UserMessages.ConfirmNoActionNeededShort}</div>
      <div class="appUploadMessage">Your confirmation numbers are:</div>
      <div>${noActionHtml}</div>
      <div>${staleHtml}</div>
      `;
    }

    if (actionList.length > 0) {
      message = message + `
      <h1 class="appUploadHeader">${MagicStrings.ConfirmationHeaderActionNeeded}</h1>
      <div class="appUploadMessage">${UserMessages.ConfirmActionNeededShort}</div>
      <div class="appUploadMessage">Your confirmation numbers are:</div>
      <div>${actionHtml}</div>
      `;
    }

    this.dialog.open(InfoDialogComponent, {
      width: '45rem',
      data: { title: MagicStrings.ConfirmationHeader, text: message, confirm: 'Close' },
      disableClose: false
    });
  }

  private createUploadSection(dataList: ObservationConfirmatonVm[]): string {
    let bullets = '';
    dataList.forEach(e => {
      bullets = bullets + this.createUploadRow(e);
    });

    return bullets;
  }

  private createUploadRow(data: ObservationConfirmatonVm): string {
    return `<p><strong>${data.ConfirmationNumber} - ${data.SpeciesName} - ${moment(data.Date).format('DD/MM/YYYY')}</strong></p>`;
  }

}
