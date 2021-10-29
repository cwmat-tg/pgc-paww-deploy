import { Component, Input, OnInit } from '@angular/core';
import { LngLatLike } from 'maplibre-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // Map config
  @Input() zoom: number = 6;
  @Input() center: LngLatLike = [-77.1945, 41.2033];
  @Input() styleEnum: string = 'ArcGIS:Streets';
  apiKey = environment.esriApiKey;
  basemapStyle = `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${this.styleEnum}?type=style&token=${this.apiKey}`;

  constructor() { }

  ngOnInit(): void {
  }

}
