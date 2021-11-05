import { Injectable } from '@angular/core';
import { geocode, IEndpointOptions, IGeocodeOptions, suggest } from '@esri/arcgis-rest-geocoding';
import { IExtent, IPoint } from '@esri/arcgis-rest-types';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Candidate, SearchTypes } from './geo-search.model';

@Injectable({
  providedIn: 'root'
})
export class GeoSearchService {

  private readonly defaultBias: number[] = [-111.579, 34.284]; // Rough Center of AZ

  private readonly defaultMaxCandidates: number = 10;

  // @ts-ignore
  private candidates$: BehaviorSubject<Candidate[]> = new BehaviorSubject([]);

  private readonly webMercatorExtentOffset: number = 32000; // Will only be valid for a projected coordinate system using meters as base unit (ex: Web Mercator)

  private subs: Subscription[] = [];

  constructor() { }

  public getCandidates(): Observable<Candidate[]> {
    return this.candidates$.asObservable();
  }

  private setCandidates(inCandidates: Candidate[]) {
    this.candidates$.next(inCandidates);
  }

  searchCandidates(
    inString: string,
    biasCoord?: number[],
    maxCandidates?: number
  ) {

    if (this.subs.length) {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })

      this.subs = [];
    }
    if (!inString) {
      this.clearCandidates();
    }

    if (!biasCoord)
      biasCoord = this.defaultBias;

    if (!maxCandidates)
      maxCandidates = this.defaultMaxCandidates;

    if (Object.prototype.toString.call(inString) !== "[object String]")
      return;

    let resultsSubject: Subject<Candidate[]> = new Subject<Candidate[]>();

    let res: any[] = [];

    let resultSub = resultsSubject.subscribe(result => {
      res = res.concat(result);
      this.setCandidates(res);
    });

    this.subs = [resultSub];


    // if (this.isCoordinate(inString)) {
    //   const coordPoint = this.getCoordFromString(inString);
    //   const projCoord = ol.proj.fromLonLat([coordPoint.x, coordPoint.y])
    //   const coordCandidate = {
    //     name: inString,
    //     location: { x: projCoord[0], y: projCoord[1] },
    //     extent: {
    //       xmax: projCoord[0] + this.webMercatorExtentOffset,
    //       xmin: projCoord[0] - this.webMercatorExtentOffset,
    //       ymax: projCoord[1] + this.webMercatorExtentOffset,
    //       ymin: projCoord[1] - this.webMercatorExtentOffset
    //     } as IExtent,
    //     source: SearchTypes.DDCoordinate
    //   } as Candidate;

    //   //this.setCandidates([coordCandidate]);
    //   resultsSubject.next([coordCandidate]);
    // }





    

    // try {
    //   this.api.post<Candidate[]>('LayerSearch', 'GetCandidates', { searchString: inString, limit: 10 })
    //     .subscribe(res => {
    //       resultsSubject.next(res);
    //     })
    // } catch {
    // }

    suggest(inString, {
        location: `${biasCoord[0]},${biasCoord[1]}`,
        countryCode: 'USA',
      } as IEndpointOptions)
      .then(suggestResult => {
      if (suggestResult.suggestions.length < 1) {
        this.clearCandidates();
        return;
      }

      suggestResult.suggestions.forEach(suggestion => {
        if(!suggestion.isCollection)
        {
           geocode({
            singleLine: suggestion.text,
            magicKey: suggestion.magicKey,
            countryCode: 'USA',
            // params: {
            //   maxLocations: maxCandidates,
            //   outSR: 102100 // WKID Web Mercator - EPSG 3857
            // } as IGeocodeOptions
          }).then(result => {
            let candidates = result.candidates.map(item => {
              return {
                name: item.address,
                location: { ...item.location },
                extent: { ...item.extent },
                source: SearchTypes.EsriGeocode
              } as Candidate;
            });
            resultsSubject.next(candidates);
          })
        }
      })
      
    })


  }

  public clearCandidates(): void {
    this.setCandidates([]);
  }

  // private isCoordinate(inString: string) {
  //   const trimString = inString.trim();
  //   const isInCoordForm = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.test(trimString);

  //   if (
  //     trimString &&
  //     isInCoordForm &&
  //     trimString.length >= 5) // Technically the min length for a valid AZ coord is 7 but giving some leeway 
  //   {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // private getCoordFromString(inCoordString: string): IPoint {
  //   // Assumes that the string has already been verified as a valid coord
  //   const splitString = inCoordString.trim().split(',');
  //   const newCoord = {
  //     x: parseFloat(splitString[0]),
  //     y: parseFloat(splitString[1])
  //   } as IPoint;
  //   return newCoord || null;
  // }
}
