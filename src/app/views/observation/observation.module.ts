import { ObservationRoutingModule } from './observation-routing.module';
import { SharedModule } from './../../_shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationComponent } from './observation.component';
import { LocationComponent } from './location/location.component';
import { MapComponent } from './location/map/map.component';
import { NgxMapLibreGLModule } from 'ngx-maplibre-gl';
import { OutOfStateComponent } from './out-of-state/out-of-state.component';
import { ContactComponent } from './contact/contact.component';
import { AnimalComponent } from './animal/animal.component';
import { GeoSearchComponent } from './location/geo-search/geo-search.component';


@NgModule({
  declarations: [
    ObservationComponent,
    LocationComponent,
    MapComponent,
    OutOfStateComponent,
    ContactComponent,
    AnimalComponent,
    GeoSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObservationRoutingModule,
    NgxMapLibreGLModule
  ]
})
export class ObservationModule { }
