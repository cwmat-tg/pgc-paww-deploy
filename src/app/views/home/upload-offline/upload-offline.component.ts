import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { InfoDialogComponent } from 'src/app/_shared/components/info-dialog/info-dialog.component';
import { LoadingDialogComponent } from 'src/app/_shared/components/loading-dialog/loading-dialog.component';
import { ObservationDtoContainer } from 'src/app/_shared/models/observation.model';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';
import { ApiService } from 'src/app/_shared/services/api.service';
import { ConnectionService } from 'src/app/_shared/services/connection.service';
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-offline',
  templateUrl: './upload-offline.component.html',
  styleUrls: ['./upload-offline.component.scss']
})
export class UploadOfflineComponent implements OnDestroy {
  // Config
  tooltipText = UserMessages.UploadTooltip;
  count = 0;
  confNums: string[] = [];
  initialCount = 0;

  // Inputs
  @Input() offlineObs: ObservationDtoContainer[] = [];
  @Input() offlineObsCount: number = 0;

  // Outputs
  @Output() uploadProcessed: EventEmitter<string> = new EventEmitter();
  @Output() alluploadsProcessed: EventEmitter<string[]> = new EventEmitter();

  // Connection check
  isOffline!: boolean;

  // Subs
  isOffline$!: Subscription;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private connectionService: ConnectionService,
    private localStorageService: LocalStorageService,
  ) {
    this.isOffline = this.connectionService.isOffline;
    this.isOffline$ = this.connectionService.isOffline$().subscribe(res => {
      this.isOffline = res;
    });
  }

  ngOnDestroy() {
    this.isOffline$.unsubscribe();
  }

  clicked() {
    const confirmDialogRef = this.dialog.open(InfoDialogComponent, {
      width: '35rem',
      data: { title: 'Upload Observations', text: UserMessages.UploadTooltip, confirm: 'Confirm Upload', cancel: 'Cancel' },
      disableClose: false
    });

    confirmDialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.offlineObs.forEach(e => {
          this.processUpload({ ...e });
        });
      }
    });
  }

  processUpload(obsContainer: ObservationDtoContainer) {
    // Open loading spinner
    const saveRef = this.dialog.open(LoadingDialogComponent, {
      width: '25rem',
      data: "Saving Observation.",
      disableClose: true
    });

    const payload = obsContainer.data;
    const mediaPaylod = obsContainer.media;

    this.initialCount = this.offlineObsCount;

    // POST to API
    this.api.createObservation(payload).subscribe(res => {
      // Will hold any media POST observables for the forkjoin below
      const mediaRequests = [] as Observable<any>[];
      const confNum = environment.useTestApi ? res.name : res.confirmationnumber;
      if (mediaPaylod.length > 0) {
        mediaPaylod.forEach(e => {
          mediaRequests.push(this.api.createObservationMedia({...e, ConfirmationNumber: confNum}));
        });
        forkJoin(mediaRequests).subscribe(results => {
          // All uploads succeeded
          console.log(results);
          saveRef.close();
          this.localStorageService.removeObservation(obsContainer.dbId);
          this.checkConfNums(confNum);
        }, error => {
          // One or all of the media items failed to upload
          console.error(error);
          saveRef.close();
        });
      } else {
        // There was no media uploads but the initial obs post worked
        saveRef.close();
        this.localStorageService.removeObservation(obsContainer.dbId);
        this.checkConfNums(confNum);
      }
    }, err => {
      // The initial request failed or there was no confirmation number
      console.error(err);
      saveRef.close();
    });
  }

  private checkConfNums(confNum: string | undefined) {
    if (!confNum)
      return;

    this.confNums.push(confNum);
    this.uploadProcessed.emit(confNum);

    if (this.initialCount === this.confNums.length)
      this.alluploadsProcessed.emit(this.confNums);
  }

}
