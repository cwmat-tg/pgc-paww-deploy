import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Affiliation, AnimalCount } from '../models/config.model';
import { MagicStrings } from '../models/magic-strings.model';

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
    return this.http.get<AnimalCount[]>(
      `${this.apiEndpoint}/${MagicStrings.AnimalCount}`
    )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Affiliation
  getAffiliation(): Observable<Affiliation[]> {
    return this.http.get<Affiliation[]>(
      `${this.apiEndpoint}/${MagicStrings.Affiliation}`
    )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
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
