import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements OnInit {
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    breakpointObserver: BreakpointObserver,
    ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
  }

}
