import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Candidate, Candidates, SearchTypes } from './geo-search.model';
import { GeoSearchService } from './geo-search.service';

@Component({
  selector: 'app-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.scss']
})
export class GeoSearchComponent implements OnInit, OnDestroy {
  searchCtrl = new FormControl();

  candidates: Candidate[] = [];

  tooltipMessage = 'You can enter a Conservation District name, HUC, NRCS Field Office, township and range, address, location, or longitude/latitude coordinates and then press Enter or click a suggested result. Longitude and latitude searches must be in Decimal Degrees: e.g., -111.32, 33.48. Township and range searches must be entered in the format T25N R12W.';

  @Input() mapCenter: any = { x: -111.579, y: 34.284 }; // Rough Center of AZ

  @Output() zoomToCandidates: EventEmitter<Candidates> = new EventEmitter();

  @Output() clearPoints: EventEmitter<void> = new EventEmitter();

  private valuesChange$!: Subscription;

  private newCandidates$!: Subscription;

  constructor(
    private geoSearchService: GeoSearchService
  ) { }

  ngOnInit(): void {
    this.newCandidates$ = this.geoSearchService.getCandidates().subscribe(candidates => {
      this.candidates = candidates;
    });

    this.valuesChange$ = this.searchCtrl.valueChanges.subscribe(_ => {
      let value = this.searchCtrl.value
      if (value === '' || !value) {
        this.geoSearchService.clearCandidates();
      }
      this.geoSearchService.searchCandidates(value, [this.mapCenter.x, this.mapCenter.y]);
    });
  }

  ngOnDestroy(): void {
    this.valuesChange$.unsubscribe();
    this.newCandidates$.unsubscribe();
  }

  goToLocation(selectedCandidate: Candidate): void {
    // @ts-ignore
    const foundCandidate: Candidate = this.candidates.find(
      candidate => candidate.name === selectedCandidate.name &&
        candidate.location.x === selectedCandidate.location.x &&
        candidate.location.y === selectedCandidate.location.y);

    const leftOffset = 0;

    if (foundCandidate.source === SearchTypes.DDCoordinate) {
      const coordCandidate = {
        candidates: [foundCandidate],
        paddingLeft: leftOffset,
        paddingBottom: 0
      } as Candidates;
      this.zoomToCandidates.emit(coordCandidate);
    } else {
      const foundCandidates = {
        candidates: [foundCandidate],
        paddingLeft: leftOffset,
        paddingBottom: 0
      } as Candidates;
      this.zoomToCandidates.emit(foundCandidates);
    }
  }

  clearValues() {
    this.searchCtrl.setValue('');
    this.clearPoints.emit();
  }

  getOptionName(data: Candidate): string {
    if (data) {
      return data.name;
    } else {
      // @ts-ignore
      return null;
    }
  }

}
