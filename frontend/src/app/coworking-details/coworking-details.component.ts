// src/app/coworking/coworking-details/coworking-details.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Workspace } from '../contracts/Workspace';
import { Amenity } from '../contracts/Amenity';
import { loadAmenitiesByWorkspace } from '../store/amenity/amenity.actions';
import {
  selectAmenityLoading,
  selectAmenityError,
  selectAllAmenities,
} from '../store/amenity/amenity.selectors';
import { loadAvailabilitiesByWorkspace } from '../store/availability/availability.actions';
import {
  selectAvailabilityLoading,
  selectAvailabilityError,
  selectAllAvailabilities,
} from '../store/availability/availability.selectors';
import { loadPhotosByWorkspace } from '../store/photo/photo.actions';
import {
  selectPhotoLoading,
  selectPhotoError,
  selectAllPhotos,
} from '../store/photo/photo.selectors';
import { loadWorkspaces } from '../store/workspace/workspace.actions';
import {
  selectWorkspaceLoading,
  selectWorkspaceError,
  selectAllWorkspaces,
} from '../store/workspace/workspaces.selectors';
import { Availability } from '../contracts/Availability';

interface ExtendedWorkspace extends Workspace {
  mainPhoto: string;
  photos: string[];
  amenities: Amenity[];
  availabilities: Availability[];
  isBooked: boolean;
  bookingInfo: string;
}

@Component({
  selector: 'app-coworking-details',
  standalone: false,
  templateUrl: './coworking-details.component.html',
  styleUrls: ['./coworking-details.component.scss'],
})
export class CoworkingDetailsComponent implements OnInit {
  workspaces$!: Observable<ExtendedWorkspace[]>;
  workspaceLoading$!: Observable<boolean>;
  amenityLoading$!: Observable<boolean>;
  photoLoading$!: Observable<boolean>;
  availabilityLoading$!: Observable<boolean>;
  workspaceError$!: Observable<string | null>;
  amenityError$!: Observable<string | null>;
  photoError$!: Observable<string | null>;
  availabilityError$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.workspaceLoading$ = this.store.select(selectWorkspaceLoading);
    this.amenityLoading$ = this.store.select(selectAmenityLoading);
    this.photoLoading$ = this.store.select(selectPhotoLoading);
    this.availabilityLoading$ = this.store.select(selectAvailabilityLoading);
    this.workspaceError$ = this.store.select(selectWorkspaceError);
    this.amenityError$ = this.store.select(selectAmenityError);
    this.photoError$ = this.store.select(selectPhotoError);
    this.availabilityError$ = this.store.select(selectAvailabilityError);

    this.isLoading$ = combineLatest([
      this.workspaceLoading$,
      this.amenityLoading$,
      this.photoLoading$,
      this.availabilityLoading$,
    ]).pipe(
      map(
        ([
          workspaceLoading,
          amenityLoading,
          photoLoading,
          availabilityLoading,
        ]) =>
          workspaceLoading ||
          amenityLoading ||
          photoLoading ||
          availabilityLoading
      )
    );

    this.workspaces$ = combineLatest([
      this.store
        .select(selectAllWorkspaces)
        .pipe(map((workspaces) => workspaces ?? [])),
      this.store
        .select(selectAllAmenities)
        .pipe(map((amenities) => amenities ?? [])),
      this.store.select(selectAllPhotos).pipe(map((photos) => photos ?? [])),
      this.store
        .select(selectAllAvailabilities)
        .pipe(map((availabilities) => availabilities ?? [])),
    ]).pipe(
      map(([workspaces, amenities, photos, availabilities]) =>
        workspaces.map((workspace) => {
          const workspaceAmenities = amenities.filter(
            (amenity) => amenity.workspaceId === workspace.id
          );
          const workspacePhotos = photos.filter(
            (photo) => photo.workspaceId === workspace.id
          );
          const workspaceAvailabilities = availabilities.filter(
            (availability) => availability.workspaceId === workspace.id
          );

          const mainPhoto = workspacePhotos[0]?.url ?? 'default-main.jpg';
          const otherPhotos = workspacePhotos.slice(1, 5).map((p) => p.url);

          // Determine if booked based on current date (June 04, 2025, 08:10 PM EEST)
          const currentDate = new Date('2025-06-04T20:10:00+03:00'); // EEST offset
          const isBooked =
            workspaceAvailabilities.some(
              (a) =>
                a.capacityOption === 2 &&
                new Date('2025-05-18') <= currentDate &&
                currentDate <= new Date('2025-05-23')
            ) || false;
          const bookingInfo = isBooked
            ? 'Room for 2 people May 18, 2025 to May 23, 2025'
            : '';

          return {
            ...workspace,
            mainPhoto,
            photos: otherPhotos,
            amenities: workspaceAmenities,
            availabilities: workspaceAvailabilities,
            isBooked,
            bookingInfo,
          };
        })
      )
    );

    this.store.dispatch(loadWorkspaces());
    this.store.select(selectAllWorkspaces).subscribe((workspaces) => {
      workspaces.forEach((workspace) => {
        this.store.dispatch(
          loadAmenitiesByWorkspace({ workspaceId: workspace.id })
        );
        this.store.dispatch(
          loadPhotosByWorkspace({ workspaceId: workspace.id })
        );
        this.store.dispatch(
          loadAvailabilitiesByWorkspace({ workspaceId: workspace.id })
        );
      });
    });
  }

  workspaceAvailabilities(workspace: ExtendedWorkspace): any {
    if (workspace.availabilityUnit === 'desk') {
      return workspace.availabilities.reduce((sum, a) => sum + a.quantity, 0); // Total quantity for desks
    } else if (workspace.availabilityUnit === 'room') {
      return workspace.availabilities.sort(
        (a, b) => a.capacityOption - b.capacityOption
      ); // Sorted array for rooms
    }
    return [];
  }
}
