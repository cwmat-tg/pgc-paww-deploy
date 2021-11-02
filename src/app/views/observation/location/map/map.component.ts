import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LngLatLike, Map } from 'maplibre-gl';
import { PointGeom } from 'src/app/_shared/models/observation.model';
import { environment } from 'src/environments/environment';
import { MapModel } from './map.model';
import booleanIntersects from '@turf/boolean-intersects';
import * as turf from '@turf/turf';
import * as paBoundary from 'src/assets/gis/pa.json';

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
  inState = true;

  // Outputs
  @Output() newLocation = new EventEmitter<PointGeom>();
  @Output() newIntersectStatus = new EventEmitter<boolean>();

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
    this.inState = this.checkIntersection(this.coordinates);
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
    this.newLocation.emit({ lat: this.coordinates[0] || 0.0, long: this.coordinates[1] || 0.0 });
    this.newIntersectStatus.emit(this.inState);
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

  checkIntersection(coords: number[]) {
    const polyRaw = paBoundary;
    const poly = turf.polygon(polyRaw.coordinates);
    const point = turf.point(coords);
    return booleanIntersects(poly, point);
  }

}
