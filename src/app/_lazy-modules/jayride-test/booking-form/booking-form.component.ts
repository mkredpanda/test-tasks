import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  submitted = false;
  bookingForm: FormGroup = new FormGroup({
    travellerName: new FormControl(''),
    travellerEmail: new FormControl(''),
    channel: new FormControl('partner'),
    meetGreet: new FormControl(false),
    travelDatetime: new FormControl(''),
    bookingPrice: new FormControl(''),
  });
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      travellerName: ['', Validators.required],
      travellerEmail: ['', [Validators.required, Validators.email]],
      channel: ['partner', Validators.required],
      meetGreet: [false],
      travelDatetime: ['', Validators.required],
      bookingPrice: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.bookingForm.controls;
  }
  submitForm() {
    this.submitted = true;
    if (this.bookingForm && this.bookingForm.valid) {
      console.log('Form submitted successfully!');
      console.log('Form values:', this.bookingForm.value);
    } else {
      console.log(this.bookingForm.valid)
    }
  }

  onReset(): void {
    this.submitted = false;
    this.bookingForm.reset();
  }
}
