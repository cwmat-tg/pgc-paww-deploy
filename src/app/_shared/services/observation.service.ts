import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Observation } from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  private _observation: BehaviorSubject<Observation> = new BehaviorSubject({});

  constructor() { }

  getObservation(): Observable<Observation> {
    return this._observation.asObservable();
  }

  updateObservation(newObs: Observation) {
    this._observation.next({ ...newObs });
    return this._observation.asObservable();
  }
}
