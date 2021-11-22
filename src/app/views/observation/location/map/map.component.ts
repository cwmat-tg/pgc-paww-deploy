import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { GeolocateControl, LngLatBounds, LngLatLike, Map } from 'maplibre-gl';
import { PointGeom } from 'src/app/_shared/models/observation.model';
import { environment } from 'src/environments/environment';
import { MapModel } from './map.model';
import booleanIntersects from '@turf/boolean-intersects';
import * as turf from '@turf/turf';
import * as paBoundary from 'src/assets/gis/pa.json';
import * as paCounties from 'src/assets/gis/pa_county.json';
import { ControlComponent, Position } from 'ngx-maplibre-gl';
import { Subscription } from 'rxjs';
import { ConnectionService } from 'src/app/_shared/services/connection.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  // Map config
  @Input() zoom: number = 6;
  @Input() center: LngLatLike = [-77.1945, 41.2033];
  @Input() styleEnum: string = 'ArcGIS:Streets';
  apiKey = environment.esriApiKey;
  streetsStyle = `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${this.styleEnum}?type=style&token=${this.apiKey}`;
  offlineStyle = {version: 8, sources: {}, layers: []};
  basemapStyle: any = this.streetsStyle;
  map!: Map;
  cursorStyle!: string;
  bounds!: LngLatBounds;

  // Location Select State
  isActive = false;
  showPoint = true;
  coordinates: number[] = [];
  layerPaint = MapModel.PointPaintStyle;
  inState = true;

  // Outputs
  @Output() newLocation = new EventEmitter<PointGeom>();
  @Output() newIntersectStatus = new EventEmitter<boolean>();

  // View Children
  @ViewChild('geolocater') geolocater!: ControlComponent<GeolocateControl>;
  @ViewChild('mainMap') mainMap!: Map;

  // Offline Layers
  offlineLayersOn = false;
  paCounty: any = paCounties;
  paCountyPaint: any = MapModel.FillCountyPaintStyle;

  // Connection check
  isOffline!: boolean;

  // Subs
  isOffline$!: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private connectionService: ConnectionService,
    private _snackBar: MatSnackBar,
  ) {
    this.isOffline = this.connectionService.isOffline;
    this.isOffline$ = this.connectionService.isOffline$().subscribe(res => {
      this.isOffline = res;
      this.checkOfflineFunctionality();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.isOffline$.unsubscribe();
  }

  activate() {
    this.isActive = true;
  }

  startSelect() {
    // Start active session
    const mapCenter = this.map.getCenter();
    this.setCoordinates([mapCenter.lng, mapCenter.lat]);
    this.activate();
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

  newGPSLocation(event: Position) {
    console.log('New Location', event);
    this.setCoordinates([event.coords?.longitude || 0.0, event.coords?.latitude || 0.0]);
    this.saveLocation();

    // Turn off the geolocate
    const geoControl = this.geolocater.control as GeolocateControl;
    geoControl.trigger()
  }

  noGPSLocation(event: ErrorEvent) {
    console.log('Location Error', event);
  }

  zoomToCandidates(event: any ) {
    console.log('New Search Location', event);
    
    if (event?.candidates?.length > 0) {
      this.setCoordinates([event.candidates[0]?.location?.x || 0.0, event.candidates[0]?.location?.y || 0.0]);
      this.bounds = this.coordinates.reduce((bounds, coord) => {
        return bounds.extend(<any>coord);
      }, new LngLatBounds([this.coordinates[0], this.coordinates[1]], [this.coordinates[0], this.coordinates[1]]));

      this.activate();
    }

  }

  openSnackBar(message: string, action: string = 'Close') {
    this._snackBar.open(message, action);
  }

  private enableOfflineMapping() {
    this.basemapStyle = this.offlineStyle;
    this.offlineLayersOn = true;
  }

  private disableOfflineMapping() {
    this.basemapStyle = this.streetsStyle;
    this.offlineLayersOn = false;
  }

  private checkOfflineFunctionality() {
    if (this.isOffline) {
      console.log('Enabling offline mapping...');
      this.openSnackBar(UserMessages.OfflineMap);
      this.enableOfflineMapping();
    } else {
      console.log('Disabling offline mapping...');
      this.disableOfflineMapping();
    }
  }

}
