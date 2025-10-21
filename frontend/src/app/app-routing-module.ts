import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Events } from './events/event-list/events';
import { MyEvents } from './events/my-events/my-events';
import { CreateEvent } from './events/create-event/create-event';
import { Auth } from './auth/auth';

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: Events },
  { path: 'create-event', component: CreateEvent },
  { path: 'my-events', component: MyEvents },
  { path: 'login', component: Auth },
  { path: 'register', component: Auth },
  { path: '**', redirectTo: '/events' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
