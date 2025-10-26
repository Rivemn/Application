import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './button/button';
import { FormInput } from './form-input/form-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Calendar } from './calendar/calendar';
import { EventForm } from './event-form/event-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [Button, FormInput, Calendar, EventForm],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatDatepicker,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  exports: [Button, FormInput, Calendar, EventForm, CommonModule, FormsModule, RouterModule],
})
export class SharedModule {}
