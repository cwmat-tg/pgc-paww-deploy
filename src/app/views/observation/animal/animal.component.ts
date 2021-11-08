import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { Age, AnimalCount, Captive, Species, YesNo } from 'src/app/_shared/models/config.model';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';
import { Information } from 'src/app/_shared/models/observation.model';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';
import { ApiService } from 'src/app/_shared/services/api.service';
import { ObservationService } from 'src/app/_shared/services/observation.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
  animations: [
    trigger('state', [
        state('hidden', style({
            opacity: '0',
        })),
        state('visible', style({
          opacity: '1'
        })),
        transition('* => visible', [animate('500ms ease-out')]),
        transition('visible => hidden', [animate('500ms ease-out')])
    ]),
  ]
})
export class AnimalComponent implements OnInit, OnDestroy {
  // Config
  header = MagicStrings.AnimalHeader;
  content = UserMessages.AnimalHelperText;
  state = 'hidden';

  // Forms
  animalForm = new FormGroup({
    date: new FormControl('', [
      Validators.required,
    ]),
    numberOfAnimals: new FormControl('', [
      Validators.required,
    ]),
    species: new FormControl('', [
      Validators.required,
    ]),
    alive: new FormControl('', [
      Validators.required,
    ]),
    sickOrInjured: new FormControl('', [
    ]),
    inYourPossession: new FormControl('', [
    ]),
    poaching: new FormControl('', [
    ]),
    age: new FormControl('', [
      Validators.required,
    ]),
    captiveWild: new FormControl('', [
      Validators.required,
    ]),
    rabies: new FormControl('', [
    ]),
    zoonotic: new FormControl('', [
      Validators.required,
    ]),
    details: new FormControl('', [
      Validators.maxLength(1500),
    ]),
  });

  // Dropdowns
  numberOfAnimalsList: AnimalCount[] = [];
  speciesList: Species[] = [];
  yesNoList: YesNo[] = [];
  ageList: Age[] = [];
  captiveList: Captive[] = [];

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
          next: (data) => {
            this.obsStore.getObservation()
              .pipe(first())
              .subscribe(res => {
                if (this.animalForm.valid) {
                  const newData = { ...res };
                  newData.information = { ...data as Information};
                  this.obsStore.updateObservation(newData);
                }
                this.isValid.emit(this.animalForm.valid);
                this.checkHiddenFields();
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

  get species() { return this.animalForm.get('species'); }

  get numberOfAnimals() { return this.animalForm.get('numberOfAnimals'); }

  get alive() { return this.animalForm.get('alive'); }

  get sickOrInjured() { return this.animalForm.get('sickOrInjured'); }

  get inYourPossession() { return this.animalForm.get('inYourPossession'); }

  get poaching() { return this.animalForm.get('poaching'); }

  get age() { return this.animalForm.get('age'); }

  get captiveWild() { return this.animalForm.get('captiveWild'); }

  get rabies() { return this.animalForm.get('rabies'); }

  get zoonotic() { return this.animalForm.get('zoonotic'); }

  get details() { return this.animalForm.get('details'); }

  initializeDropdowns() {
      // Animal Count
      this.api.getAnimalCount().subscribe(res => {
        this.numberOfAnimalsList = res;
      },
      error => {
        console.error(error);
      });

      // Species
      this.api.getSpecies().subscribe(res => {
        this.speciesList = res;
      },
      error => {
        console.error(error);
      });

      // Yes/No
      this.api.getYesNo().subscribe(res => {
        this.yesNoList = res;
      },
      error => {
        console.error(error);
      });

      // Age
      this.api.getAge().subscribe(res => {
        this.ageList = res;
      },
      error => {
        console.error(error);
      });

      // Captive
      this.api.getCaptive().subscribe(res => {
        this.captiveList = res;
      },
      error => {
        console.error(error);
      });
  }

  checkHiddenFields() {
    if (this.state === 'hidden' && this.date?.valid && this.numberOfAnimals?.valid) {
      this.state = 'visible';
    }
  }

}
