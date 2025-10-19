import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Events } from './events/events';
import { MyEvents } from './my-events/my-events';
import { CreateEvent } from './create-event/create-event';
import { EventDetails } from './event-details/event-details';

const routes: Routes = [
  { path: 'event-detail/:id', component: EventDetails },
  { path: 'events', component: Events },
  { path: 'create-event', component: CreateEvent },
  { path: 'my-events', component: MyEvents },
  { path: '', redirectTo: '/coworking-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
