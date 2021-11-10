import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ObservationService } from 'src/app/_shared/services/observation.service';
import { ContactComponent } from './contact/contact.component';
import { LocationComponent } from './location/location.component';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements AfterViewInit {
  // Stepper config
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;
  totalSteps = 3;

  // View children
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('location') location!: LocationComponent;
  @ViewChild('contact') contact!: ContactComponent;

  // Valid Check
  locationIsValid = false;
  contactIsValid = true;
  observationIsValid = false;
  isValid = false;

  constructor(
    breakpointObserver: BreakpointObserver,
    private router: Router,
    public obsStore: ObservationService,
  ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  ngAfterViewInit() {
    this.stepper.selectionChange.subscribe(res => {
      this.checkValid(res.selectedIndex);
    });
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

  checkValid(newStepperIndex?: number) {
    let currentIdx: number;
    if (newStepperIndex === undefined) {
      currentIdx = this.stepper.selectedIndex;
    } else {
      currentIdx = newStepperIndex;
    }

    switch (currentIdx) {
      case 0:
        if (this.locationIsValid) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
        break;
      case 1:
        if (this.contactIsValid) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
        break;
      case 2:
      
        break;
    
      default:
        break;
    }
  }

}
