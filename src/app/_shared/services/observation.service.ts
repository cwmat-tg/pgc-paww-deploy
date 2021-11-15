import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Observation, ObservationDto, ObservationDtoContainer } from '../models/observation.model';

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

  getObservationDto(): ObservationDtoContainer {
    return {
      data: this.convertObsVmToDto(this._observation.value),
      media: this.convertMediaVmToDto();
    } as ObservationDtoContainer;
  }

  convertObsVmToDto(data: Observation): ObservationDto {
    return {
      geometry: { ...data.geometry },
      inState: data.inState,
      name: data.contact?.name,
      affiliation: data.contact?.affiliation,
      email: data.contact?.email,
      phone: data.contact?.phone,
      date: data.information?.date,
      numberOfAnimals: data.information?.numberOfAnimals,
      species: data.information?.species,
      alive: data.information?.alive,
      sickOrInjured: data.information?.sickOrInjured,
      inYourPossession: data.information?.inYourPossession,
      poaching: data.information?.poaching,
      age: data.information?.age,
      captiveWild: data.information?.captiveWild,
      rabies: data.information?.rabies,
      zoonotic: data.information?.zoonotic,
      details: data.information?.details
    } as ObservationDto;
  }

  convertMediaVmToDto() {

  }
}
