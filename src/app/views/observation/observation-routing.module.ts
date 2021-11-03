import { ObservationComponent } from './observation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutOfStateComponent } from './out-of-state/out-of-state.component';

const routes: Routes = [
  { path: '', component: ObservationComponent },
  { path: 'outofstate', component: OutOfStateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservationRoutingModule {}
