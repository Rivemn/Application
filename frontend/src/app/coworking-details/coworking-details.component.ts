import { Component } from '@angular/core';
import { Workspace } from '../contracts/Workspace';
import { WorkspaceService } from '../services/workspace.service';

import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Amenity } from '../contracts/Amenity';
import { WorkspaceAmenityService } from '../services/workspaceAmenity.service';

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
    private amenityService: WorkspaceAmenityService
  ) {
    this.workspaces$ = this.workspaceService.getAll().pipe(
      switchMap((workspaces) => {
        const workspaceObservables = workspaces.map((workspace) =>
          this.amenityService.getAmenitiesByWorkspaceId(workspace.id).pipe(
            map((amenities) => ({
              ...workspace,
          mainPhoto: 'pexels-pixabay-221537.jpg',
          mainPhotoOverlay: 'photos/OpenSpace/main-photo.png',
          photos: [
            'photos/OpenSpace/image1.png',
            'photos/OpenSpace/image2.png',
            'photos/OpenSpace/image3.png',
            'photos/OpenSpace/image4.png',
          ],
              amenities, // здесь уже полноценный список аменитисов
          isBooked: true,
          bookingInfo: 'Room for 2 people May 18, 2025 to May 23, 2025',
        }))
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
