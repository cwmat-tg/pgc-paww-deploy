import { Component, OnInit } from '@angular/core';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  // Config
  header = MagicStrings.LocationHeader;
  content = UserMessages.LocationHelperText;
}
