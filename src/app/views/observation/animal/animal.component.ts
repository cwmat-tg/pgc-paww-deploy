import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { AnimalCount } from 'src/app/_shared/models/config.model';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';
import { Information } from 'src/app/_shared/models/observation.model';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';
import { ApiService } from 'src/app/_shared/services/api.service';
import { ObservationService } from 'src/app/_shared/services/observation.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit, OnDestroy {
  // Config
  header = MagicStrings.AnimalHeader;
  content = UserMessages.AnimalHelperText;

  // Forms
  animalForm = new FormGroup({
    date: new FormControl('', [
      Validators.required,
    ]),
    numberOfAnimals: new FormControl('', [
      Validators.required,
    ]),
  });

  // Dropdowns
  numberOfAnimalsList: AnimalCount[] = [];

  // Date Validation
  maxDate = new Date();

  // Subscriptions
  formChangeSub!: Subscription;

  // Outputs
  @Output() isValid = new EventEmitter<boolean>(false);

  constructor(
    public obsStore: ObservationService,
    public api: ApiService,
  ) { }

  ngOnInit(): void {
    // Sub to form changes to update store on valid entries
    this.formChangeSub = this.animalForm.valueChanges
      .pipe(
        debounceTime(200)
      )
      .subscribe({
          next: (contact) => {
            this.obsStore.getObservation()
              .pipe(first())
              .subscribe(res => {
                if (this.animalForm.valid) {
                  const newData = { ...res };
                  newData.information = { ...contact as Information};
                  this.obsStore.updateObservation(newData);
                }
                this.isValid.emit(this.animalForm.valid);
              });
          }
      });

    // Init dropdowns
    this.initializeDropdowns();
  }

  ngOnDestroy() {
    this.formChangeSub.unsubscribe();
  }

  get date() { return this.animalForm.get('date'); }

  get numberOfAnimals() { return this.animalForm.get('numberOfAnimals'); }

  initializeDropdowns() {
      this.api.getAnimalCount().subscribe(res => {
        this.numberOfAnimalsList = res;
      },
      error => {
        console.error(error);
      });
  }

}
