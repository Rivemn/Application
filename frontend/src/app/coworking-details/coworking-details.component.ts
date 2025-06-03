import { Component } from '@angular/core';
import { Workspace } from '../contracts/Workspace';
import { WorkspaceService } from '../services/workspace.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Amenity } from '../contracts/Amenity';
import { WorkspaceAmenityService } from '../services/workspaceAmenity.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-coworking-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './coworking-details.component.html',
  styleUrl: './coworking-details.component.scss',
})
export class CoworkingDetailsComponent {
  workspaces$: Observable<ExtendedWorkspace[]>;

  constructor(
    private workspaceService: WorkspaceService,
    private amenityService: WorkspaceAmenityService,
    private photoService: PhotoService
  ) {
    this.workspaces$ = this.workspaceService.getAll().pipe(
      switchMap((workspaces) => {
        const workspaceObservables = workspaces.map((workspace) =>
          forkJoin({
            amenities: this.amenityService.getAmenitiesByWorkspaceId(
              workspace.id
            ),
            photos: this.photoService.getByWorkspaceId(workspace.id),
          }).pipe(
            map(({ amenities, photos }) => {
              const mainPhoto = photos[0]?.url ?? 'default-main.jpg';
              const otherPhotos = photos.slice(1, 5).map((p) => p.url); // обмежуємо до 4-х фото

              return {
                ...workspace,
                mainPhoto: mainPhoto,
                mainPhotoOverlay: mainPhoto,
                photos: otherPhotos,
                amenities,
                isBooked: true,
                bookingInfo: 'Room for 2 people May 18, 2025 to May 23, 2025',
              };
            })
          )
        );

        return forkJoin(workspaceObservables);
      })
    );
  }
}

interface ExtendedWorkspace extends Workspace {
  mainPhoto: string;
  mainPhotoOverlay: string;
  photos: string[];
  amenities: Amenity[];
  isBooked: boolean;
  bookingInfo: string;
}
