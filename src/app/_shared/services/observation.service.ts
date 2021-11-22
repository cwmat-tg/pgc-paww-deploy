import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmationState } from '../models/config.model';
import { Observation, ObservationDto, ObservationDtoContainer, ObservationMediaDto } from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  private _initialState: Observation = {
    geometry: {},
    inState: true
  };
  private _observation: BehaviorSubject<Observation> = new BehaviorSubject(this._initialState);
  private _observationMedia: BehaviorSubject<ObservationMediaDto[]> = new BehaviorSubject([] as ObservationMediaDto[]);
  private _observationSubmitState: BehaviorSubject<ConfirmationState> = new BehaviorSubject({} as ConfirmationState);

  constructor() { }

  getObservation(): Observable<Observation> {
    return this._observation.asObservable();
  }

  getObservationMedia(): Observable<ObservationMediaDto[]> {
    return this._observationMedia.asObservable();
  }

  updateObservation(newObs: Observation) {
    this._observation.next({ ...newObs });
    return this.getObservation();
  }

  updateObservationMedia(newMedia: ObservationMediaDto[]) {
    this._observationMedia.next([ ...newMedia ]);
    return this.getObservationMedia();
  }

  resetObservation() {
    this._observation.next({ ...this._initialState });
    this._observationMedia.next([]);
    this._observationSubmitState.next({} as ConfirmationState);
    return this.getObservation();
  }

  getObservationDto(): ObservationDtoContainer {
    return {
      data: this.convertObsVmToDto(this._observation.value),
      media: this._observationMedia.value
    } as ObservationDtoContainer;
  }

  getObservationSubmitState() {
    return this._observationSubmitState.value;
  }

  setObservationSubmitState(data: ConfirmationState) {
    this._observationSubmitState.next({ ...data});
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

}
