import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Geometry } from 'geojson';
import { LngLatLike, Map } from 'maplibre-gl';
import { environment } from 'src/environments/environment';
import { MapModel } from './map.model';

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
  map!: Map;
  cursorStyle!: string;

  // Location Select State
  isActive = false;
  coordinates: number[] = [];
  layerPaint = MapModel.PointPaintStyle;
  test: Geometry = {
    type: 'Point',
    coordinates: [0, 0]
  };


  constructor() { }

  ngOnInit(): void {
  }

  startSelect() {
    // Start active session and change cursor
    this.cursorStyle = 'crosshair';
    this.isActive = true;
  }

  endSelect() {
    // End active session and change cursor to default
    this.cursorStyle = '';
    this.isActive = false;
  }

  setCoordinates(newCoords: number[]) {
    this.coordinates = newCoords;
  }

  clearCoordinates() {
    this.coordinates = [];
  }

  mapClicked(event: any) {
    // Ensure the map event has a xy coord and is in an active edit session
    if (!event?.lngLat || !this.isActive) return;

    // Set coords and end active session
    console.log('Map Clicked', event);
    this.setCoordinates([event.lngLat.lng, event.lngLat.lat]);

    this.test = {
      type: 'Point',
      coordinates: [event.lngLat.lng, event.lngLat.lat]
  }
    
    this.endSelect();
    
  }

}
