import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';
import { PointGeom } from 'src/app/_shared/models/observation.model';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';
import { ObservationService } from 'src/app/_shared/services/observation.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  // Config
  header = MagicStrings.LocationHeader;
  content = UserMessages.LocationHelperText;

  constructor(
    public obsStore: ObservationService,
  ) { }

  updateLocation(event: PointGeom) {
    this.obsStore.getObservation().subscribe(res => {
      const newData = { ...res };
      newData.geometry = event;
      this.obsStore.updateObservation(newData);
    });
  }

  updateIntersectStatus(event: boolean) {
    this.obsStore.getObservation().subscribe(res => {
      const newData = { ...res };
      newData.inState = event;
      this.obsStore.updateObservation(newData);
    });
  }
}
