import { HostBinding, HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  // Config
  offlineEvent!: Observable<Event>;
  onlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];

  // Core value
  private _isOffline:BehaviorSubject<boolean> = new BehaviorSubject(navigator.onLine);

  constructor() {
    this.handleAppConnectivityChanges();
  }

  get isOffline() {
    return this._isOffline.value;
  }

  isOffline$() {
    return this._isOffline.asObservable();
  }

  @HostListener('window:offline')
  setNetworkOffline(): void {
    this._isOffline.next(true);
  }

  @HostListener('window:online')
  setNetworkOnline(): void {
    this._isOffline.next(false);
  }

  private handleAppConnectivityChanges(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      // handle online mode
      console.log('Online...');
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      // handle offline mode
      console.log('Offline...');
    }));
  }
}
