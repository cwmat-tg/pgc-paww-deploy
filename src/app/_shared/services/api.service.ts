import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Affiliation, Age, AnimalCount, Captive, Classification, Species, YesNo } from '../models/config.model';
import { MagicStrings } from '../models/magic-strings.model';
import { ObservationDto, ObservationMediaDto } from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Endpoint
  apiEndpoint = environment.apiEndpoint;

  constructor(
    private http: HttpClient,
  ) { }

  // Animal Count
  getAnimalCount(): Observable<AnimalCount[]> {
    return this.get(MagicStrings.AnimalCount);
  }

  // Affiliation
  getAffiliation(): Observable<Affiliation[]> {
    return this.get(MagicStrings.Affiliation);
  }

  // Species
  getSpecies(): Observable<Species[]> {
    return this.get(MagicStrings.Species);
  }

  // Yes/No
  getYesNo(): Observable<YesNo[]> {
    return this.get(MagicStrings.YesNo);
  }

  // Age
  getAge(): Observable<Age[]> {
    return this.get(MagicStrings.Age);
  }

  // Captive
  getCaptive(): Observable<Captive[]> {
    return this.get(MagicStrings.Captive);
  }

  // Classification
  getClassification(): Observable<Classification[]> {
    return this.get(MagicStrings.Classification);
  }

  // Create Observation
  createObservation(data: ObservationDto): Observable<any> {
    return this.post(MagicStrings.PostObs, data);
  }

  // Create Observation Media
  createObservationMedia(data: ObservationMediaDto): Observable<any> {
    return this.post(MagicStrings.PostObsMedia, data);
  }

  private get<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(
      `${this.apiEndpoint}/${endpoint}`
    )
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private post<T>(endpoint: string, data: any): Observable<T[]> {
    return this.http.post<T[]>(
      `${this.apiEndpoint}/${endpoint}`,
      data
    )
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling 
  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
