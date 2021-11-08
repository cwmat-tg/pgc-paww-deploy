import { Injectable } from '@angular/core';
import { geocode, IEndpointOptions, IGeocodeOptions, suggest } from '@esri/arcgis-rest-geocoding';
import { ApiKey } from '@esri/arcgis-rest-auth';
import { IExtent, IPoint } from '@esri/arcgis-rest-types';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate, SearchTypes } from './geo-search.model';

@Injectable({
  providedIn: 'root'
})
export class GeoSearchService {

  private readonly defaultBias: number[] = [-77.1945, 41.2033]; // Rough Center of PA

  private readonly defaultMaxCandidates: number = 10;

  // @ts-ignore
  private candidates$: BehaviorSubject<Candidate[]> = new BehaviorSubject([]);

  private subs: Subscription[] = [];

  authentication = new ApiKey({
    key: environment.esriApiKey
  });

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
    
    suggest(inString, {
        authentication: this.authentication,
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
            authentication: this.authentication,
            singleLine: suggestion.text,
            magicKey: suggestion.magicKey,
            countryCode: 'USA',
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

}
