import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, first, switchMap } from 'rxjs/operators';
import { MagicStrings } from 'src/app/_shared/models/magic-strings.model';
import { Contact } from 'src/app/_shared/models/observation.model';
import { UserMessages } from 'src/app/_shared/models/user-messages.model';
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
      Validators.required,
      Validators.maxLength(50),
    ]),
    affiliation: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
  });

  // Dropdowns
  affiliations: any[] = [{value: 1, alias: 'test1'},{value: 2, alias: 'test2'},{value: 3, alias: 'test3'}];

  // Subscriptions
  formChangeSub!: Subscription;

  constructor(
    public obsStore: ObservationService,
  ) { }

  ngOnInit(): void {
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
              });
          }
      });
  }

  ngOnDestroy() {
    this.formChangeSub.unsubscribe();
  }

  get name() { return this.contactForm.get('name'); }

  get affiliation() { return this.contactForm.get('affiliation'); }

  get email() { return this.contactForm.get('email'); }

  get phone() { return this.contactForm.get('phone'); }

}
