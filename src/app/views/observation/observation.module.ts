import { ObservationRoutingModule } from './observation-routing.module';
import { SharedModule } from './../../_shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationComponent } from './observation.component';



@NgModule({
  declarations: [
    ObservationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ObservationRoutingModule
  ]
})
export class ObservationModule { }
