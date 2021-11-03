import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Observation } from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  private _initialState: Observation = {
    geometry: {},
    inState: true
  };
  private _observation: BehaviorSubject<Observation> = new BehaviorSubject(this._initialState);

  constructor() { }

  getObservation(): Observable<Observation> {
    return this._observation.asObservable();
  }

  updateObservation(newObs: Observation) {
    this._observation.next({ ...newObs });
    return this.getObservation();
  }

  resetObservation() {
    this._observation.next({ ...this._initialState });
    return this.getObservation();
  }
}
