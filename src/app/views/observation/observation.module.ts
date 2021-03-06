import { ObservationRoutingModule } from './observation-routing.module';
import { SharedModule } from './../../_shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationComponent } from './observation.component';
import { LocationComponent } from './location/location.component';
import { MapComponent } from './location/map/map.component';
import { NgxMapLibreGLModule } from 'ngx-maplibre-gl';



@NgModule({
  declarations: [
    ObservationComponent,
    LocationComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObservationRoutingModule,
    NgxMapLibreGLModule
  ]
})
export class ObservationModule { }
