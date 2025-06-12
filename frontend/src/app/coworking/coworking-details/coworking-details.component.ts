import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Workspace } from '../../contracts/Workspace';
import { Amenity } from '../../contracts/Amenity';
import { loadAmenitiesByWorkspace } from '../../store/amenity/amenity.actions';
import {
  selectAmenityLoading,
  selectAmenityError,
  selectAllAmenities,
} from '../../store/amenity/amenity.selectors';
import { loadAvailabilitiesByWorkspace } from '../../store/availability/availability.actions';
import {
  selectAvailabilityLoading,
  selectAvailabilityError,
  selectAllAvailabilities,
} from '../../store/availability/availability.selectors';
import { loadPhotosByWorkspace } from '../../store/photo/photo.actions';
import {
  selectPhotoLoading,
  selectPhotoError,
  selectAllPhotos,
} from '../../store/photo/photo.selectors';
import { loadWorkspacesByCoworking } from '../../store/workspace/workspace.actions';
import {
  selectWorkspacesByCoworkingLoading,
  selectWorkspacesByCoworkingError,
  selectWorkspacesByCoworking,
} from '../../store/workspace/workspaces.selectors';
import { Availability } from '../../contracts/Availability';
import { ActivatedRoute } from '@angular/router';

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
  coworkingId!: string;

  workspaces$!: Observable<ExtendedWorkspace[]>;
  isLoading$!: Observable<boolean>;
  workspaceLoading$!: Observable<boolean>;
  amenityLoading$!: Observable<boolean>;
  photoLoading$!: Observable<boolean>;
  availabilityLoading$!: Observable<boolean>;
  workspaceError$!: Observable<string | null>;
  amenityError$!: Observable<string | null>;
  photoError$!: Observable<string | null>;
  availabilityError$!: Observable<string | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.coworkingId = params.get('id') || '';
      this.store.dispatch(
        loadWorkspacesByCoworking({ coworkingId: this.coworkingId })
      );
    });

    this.workspaceLoading$ = this.store.select(
      selectWorkspacesByCoworkingLoading
    );
    this.amenityLoading$ = this.store.select(selectAmenityLoading);
    this.photoLoading$ = this.store.select(selectPhotoLoading);
    this.availabilityLoading$ = this.store.select(selectAvailabilityLoading);
    this.workspaceError$ = this.store.select(selectWorkspacesByCoworkingError);
    this.amenityError$ = this.store.select(selectAmenityError);
    this.photoError$ = this.store.select(selectPhotoError);
    this.availabilityError$ = this.store.select(selectAvailabilityError);

    this.isLoading$ = combineLatest([
      this.workspaceLoading$,
      this.amenityLoading$,
      this.photoLoading$,
      this.availabilityLoading$,
    ]).pipe(map(([w, a, p, av]) => w || a || p || av));

    const workspaces$ = this.store
      .select(selectWorkspacesByCoworking)
      .pipe(map((w) => w ?? []));

    // Загружаем связанные сущности после получения рабочих пространств
    workspaces$.subscribe((workspaces) => {
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

    this.workspaces$ = combineLatest([
      workspaces$,
      this.store.select(selectAllAmenities).pipe(map((a) => a ?? [])),
      this.store.select(selectAllPhotos).pipe(map((p) => p ?? [])),
      this.store.select(selectAllAvailabilities).pipe(map((a) => a ?? [])),
    ]).pipe(
      map(([workspaces, amenities, photos, availabilities]) =>
        workspaces.map((workspace) => {
          const workspaceAmenities = amenities.filter(
            (a) => a.workspaceId === workspace.id
          );
          const workspacePhotos = photos.filter(
            (p) => p.workspaceId === workspace.id
          );
          const workspaceAvailabilities = availabilities.filter(
            (a) => a.workspaceId === workspace.id
          );

          const mainPhoto = workspacePhotos[0]?.url ?? 'default-main.jpg';
          const otherPhotos = workspacePhotos.slice(1, 5).map((p) => p.url);

          const currentDate = new Date('2025-06-04T20:10:00+03:00');
          const isBooked = workspaceAvailabilities.some(
            (a) =>
              a.capacityOption === 2 &&
              new Date('2025-05-18') <= currentDate &&
              currentDate <= new Date('2025-05-23')
          );

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
  }

  workspaceAvailabilities(workspace: ExtendedWorkspace): any {
    if (workspace.availabilityUnit === 'desk') {
      return workspace.availabilities.reduce((sum, a) => sum + a.quantity, 0);
    } else if (workspace.availabilityUnit === 'room') {
      return workspace.availabilities.sort(
        (a, b) => a.capacityOption - b.capacityOption
      );
    }
    return [];
  }
}
