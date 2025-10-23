import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Events } from './events/event-list/events';
import { MyEvents } from './events/my-events/my-events';
import { CreateEvent } from './events/create-event/create-event';
import { AuthComponent } from './auth/auth.component';
import { EditEvent } from './events/edit-event/edit-event';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: Events },
  { path: 'create-event', component: CreateEvent, canActivate: [authGuard] },
  { path: 'events/:id/edit', component: EditEvent, canActivate: [authGuard] },
  { path: 'my-events', component: MyEvents, canActivate: [authGuard] },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: '**', redirectTo: '/events' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
