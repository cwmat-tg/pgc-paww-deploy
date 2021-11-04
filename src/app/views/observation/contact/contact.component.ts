import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, first, switchMap } from 'rxjs/operators';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';
import { Contact } from 'src/app/_shared/models/observation.model';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';
import { ApiService } from 'src/app/_shared/services/api.service';
import { ObservationService } from 'src/app/_shared/services/observation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  // Config
  header = MagicStrings.ContactHeader;
  content = UserMessages.ContactHelperText;

  // Forms
  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.maxLength(50),
    ]),
    affiliation: new FormControl('', [
    ]),
    email: new FormControl('', [
      Validators.maxLength(50),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
  });

  // Dropdowns
  affiliations: any[] = [];

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
    this.formChangeSub = this.contactForm.valueChanges
      .pipe(
        debounceTime(200)
      )
      .subscribe({
          next: (contact) => {
            this.obsStore.getObservation()
              .pipe(first())
              .subscribe(res => {
                if (this.contactForm.valid) {
                  const newData = { ...res };
                  newData.contact = { ...contact as Contact};
                  this.obsStore.updateObservation(newData);
                }
                this.isValid.emit(this.contactForm.valid);
              });
          }
      });

    // Init dropdowns
    this.initializeDropdowns();
  }

  ngOnDestroy() {
    this.formChangeSub.unsubscribe();
  }

  get name() { return this.contactForm.get('name'); }

  get affiliation() { return this.contactForm.get('affiliation'); }

  get email() { return this.contactForm.get('email'); }

  get phone() { return this.contactForm.get('phone'); }

  initializeDropdowns() {
      this.api.getAffiliation().subscribe(res => {
        this.affiliations = res;
      },
      error => {
        console.error(error);
      });
  }

}
