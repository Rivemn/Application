import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CreateEvent } from './create-event/create-event';
import { MyEvents } from './my-events/my-events';
import { SharedModule } from '../shared/shared-module';
import { Events } from './event-list/events';
import { EditEvent } from './edit-event/edit-event';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { authReducer } from '../store/auth/auth.reducer';
import { AuthEffects } from '../store/auth/auth.effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from '../auth/auth-module';
import { AiAssistant } from '../shared/ai-assistant/ai-assistant';
@NgModule({
  declarations: [Events, MyEvents, CreateEvent, EditEvent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipListbox,
    MatChipOption,
    AuthModule,
  ],
})
export class EventsModule {}
