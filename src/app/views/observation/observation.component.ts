import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ObservationService } from 'src/app/_shared/services/observation.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements OnInit {
  // Stepper config
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;
  totalSteps = 3;

  constructor(
    breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public obsStore: ObservationService,
  ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  routeOutOfState() {
    this.router.navigate(['/app/observation/outofstate']);
  }

}
