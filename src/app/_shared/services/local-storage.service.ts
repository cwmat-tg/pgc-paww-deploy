import { Injectable } from '@angular/core';
import { MagicStrings } from '../models/magic-strings.model';
import { ObservationDtoContainer } from '../models/observation.model';
import * as uuid from 'uuid';
import Dexie from '@dpogue/dexie';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  db!: Dexie;
  rows: ObservationDtoContainer[] = [];
  

  constructor() {
    this.db = new Dexie(MagicStrings.LocalStorageObsKey);
    this.db.version(1).stores({
      paww: 'uid, data'
    });
    this.loadRows();
    this.db.open();
  }

  // getObservation(): ObservationDtoContainer[] {
  //   const foundData = localStorage.getItem(MagicStrings.LocalStorageObsKey);
  //   if (!foundData) return [];
  //   const parsedData = JSON.parse(foundData) as ObservationDtoContainer[] || [];
  //   return [ ...parsedData ];
  // }

  // setObservation(data: ObservationDtoContainer) {
  //   const uid = uuid.v4();
  //   const foundData = this.getObservation();
  //   foundData.push({ ...data, uid });
  //   localStorage.setItem(MagicStrings.LocalStorageObsKey, JSON.stringify([ ...foundData ]));
  // }

  // removeObservation(uid: string) {
  //   const foundData = this.getObservation();
  //   const filteredData = foundData.filter(e => e.uid !== uid);
  //   localStorage.setItem(MagicStrings.LocalStorageObsKey, JSON.stringify([ ...filteredData ]));
  // }

  // async getObservation(): Promise<ObservationDtoContainer[]> {
  //   const found = await this.dbService.getAll(MagicStrings.LocalStorageObsKey).toPromise();
  //   debugger;
  //   return [];
  // }

  // setObservation(data: ObservationDtoContainer) {
  //   const uid = uuid.v4();
  //   this.dbService
  //     .add(MagicStrings.LocalStorageObsKey, JSON.stringify({
  //       ... data,
  //       uid
  //     })
  //   );
  // }

  // removeObservation(uid: string) {
  //   // const foundData = this.getObservation();
  //   // const filteredData = foundData.filter(e => e.uid !== uid);
  //   // localStorage.setItem(MagicStrings.LocalStorageObsKey, JSON.stringify([ ...filteredData ]));
  // }

  async getObservation(): Promise<ObservationDtoContainer[]> {
    return [];
  }

  async setObservation(data: ObservationDtoContainer) {
    const uid = uuid.v4();
    const stringifiedData = JSON.stringify({ uid, ...data });
    // @ts-ignore
    const added = await this.db.paww.add({uid: uid, data: stringifiedData });
    debugger;
  }

  removeObservation(uid: string) {
    // const foundData = this.getObservation();
    // const filteredData = foundData.filter(e => e.uid !== uid);
    // localStorage.setItem(MagicStrings.LocalStorageObsKey, JSON.stringify([ ...filteredData ]));
  }

  loadRows(): void {
    // @ts-ignore
    this.db.paww.toArray().then(p => this.rows = p);
  }

  async hasObservations(): Promise<boolean> {
    const foundData = await this.getObservation();
    if (foundData?.length > 0)
      return true;
    else
      return false;
  }

}
