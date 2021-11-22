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
      LocationX: data.geometry?.long,
      LocationY: data.geometry?.lat,
      ObserverName: data.contact?.name,
      ObserverAffiliation: data.contact?.affiliation,
      ObserverEmail: data.contact?.email,
      ObserverPhone: data.contact?.phone,
      ObserverDate: data.information?.date,
      ObservationDate: data.information?.date,
      AnimalCountId: data.information?.numberOfAnimals,
      SpeciesId: data.information?.species,
      WildlifeStatusId: data.information?.alive,
      SickInjured: data.information?.sickOrInjured,
      Possession: data.information?.inYourPossession,
      Poachingsuspect: data.information?.poaching,
      WildlifeAgeId: data.information?.age,
      OriginId: data.information?.captiveWild,
      Rabies: data.information?.rabies,
      ZoonoticExposure: data.information?.zoonotic,
      ObservationDescrition: data.information?.details
    } as ObservationDto;
  }

}
