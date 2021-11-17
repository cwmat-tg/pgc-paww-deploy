import { Injectable } from '@angular/core';
import { MagicStrings } from '../models/magic-strings.model';
import { ObservationDtoContainer } from '../models/observation.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getObservation(): ObservationDtoContainer[] {
    const foundData = localStorage.getItem(MagicStrings.LocalStorageObsKey);
    if (!foundData) return [];
    const parsedData = JSON.parse(foundData) as ObservationDtoContainer[] || [];
    return [ ...parsedData ];
  }

  setObservation(data: ObservationDtoContainer) {
    const uid = uuid.v4();
    const foundData = this.getObservation();
    foundData.push({ ...data, uid });
    localStorage.setItem(MagicStrings.LocalStorageObsKey, JSON.stringify([ ...foundData ]));
  }

  removeObservation(uid: string) {
    const foundData = this.getObservation();
    const filteredData = foundData.filter(e => e.uid !== uid);
    localStorage.setItem(MagicStrings.LocalStorageObsKey, JSON.stringify([ ...filteredData ]));
  }

  hasObservations(): boolean {
    const foundData = this.getObservation();
    if (foundData?.length > 0)
      return true;
    else
      return false;
  }

}
