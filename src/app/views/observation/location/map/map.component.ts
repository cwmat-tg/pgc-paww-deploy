import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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
  showPoint = true;
  coordinates: number[] = [];
  layerPaint = MapModel.PointPaintStyle;

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  startSelect() {
    // Start active session
    const mapCenter = this.map.getCenter();
    this.setCoordinates([mapCenter.lng, mapCenter.lat]);
    this.isActive = true;
  }

  endSelect() {
    // End active session
    this.isActive = false;
  }

  setCoordinates(newCoords: number[]) {
    this.coordinates = newCoords;
    this.refreshPoint();
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
    
    this.endSelect();
  }

  saveLocation() {
    this.endSelect();
  }

  mapMoved(event: any) {
    // Ensure an active edit session
    if (!this.isActive) return;

    // Set Coords and refresh draw
    const mapCenter = this.map.getCenter();
    console.log('Map Moved', event, mapCenter);
    this.setCoordinates([mapCenter.lng, mapCenter.lat]);
  }

  refreshPoint() {
    this.showPoint = false;
    this.cd.detectChanges()
    this.showPoint = true;
  }

}
