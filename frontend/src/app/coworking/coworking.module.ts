// src/app/coworking/coworking.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { amenityReducer } from '../store/amenity/amenity.reducer';
import { photoReducer } from '../store/photo/photo.reducer';
import { availabilityReducer } from '../store/availability/availability.reducer';
import { WorkspaceEffects } from '../store/workspace/workspace.effects';
import { AmenityEffects } from '../store/amenity/amenity.effects';
import { PhotoEffects } from '../store/photo/photo.effects';
import { AvailabilityEffects } from '../store/availability/availability.effects';

import { workspaceReducer } from '../store/workspace/workspaces.reducer';
import { CoworkingDetailsComponent } from './coworking-details/coworking-details.component';
import { CoworkingListComponent } from './coworking-list/coworking-list.component';
import { coworkingReducer } from '../store/coworking/coworking.reducer';
import { CoworkingEffects } from '../store/coworking/coworking.effects';

@NgModule({
  declarations: [CoworkingDetailsComponent, CoworkingListComponent],
  imports: [
    CommonModule,
    RouterModule,

    StoreModule.forFeature('amenity', amenityReducer),
    StoreModule.forFeature('photo', photoReducer),

    StoreModule.forFeature('coworking', coworkingReducer),
    EffectsModule.forFeature([
      WorkspaceEffects,
      AmenityEffects,
      PhotoEffects,
      AvailabilityEffects,
      CoworkingEffects,
    ]),
  ],
  exports: [CoworkingDetailsComponent],
})
export class CoworkingModule {}
