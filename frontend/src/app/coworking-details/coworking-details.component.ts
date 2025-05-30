import { Component } from '@angular/core';
import { Workspace } from '../contracts/Workspace';
import { WorkspaceService } from '../services/workspace.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coworking-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './coworking-details.component.html',
  styleUrl: './coworking-details.component.scss',
})
export class CoworkingDetailsComponent {
  workspaces$: Observable<ExtendedWorkspace[]>;

  constructor(private workspaceService: WorkspaceService) {
    this.workspaces$ = this.workspaceService.getAll().pipe(
      map((workspaces) =>
        workspaces.map((w) => ({
          ...w,
          mainPhoto: 'pexels-pixabay-221537.jpg',
          mainPhotoOverlay: 'photos/OpenSpace/main-photo.png',
          photos: [
            'photos/OpenSpace/image1.png',
            'photos/OpenSpace/image2.png',
            'photos/OpenSpace/image3.png',
            'photos/OpenSpace/image4.png',
          ],
          amenities: [
            'amenities/air-conditioning.svg',
            'amenities/device-gamepad-2.svg',
            'amenities/wifi.svg',
            'amenities/coffee.svg',
          ],
          isBooked: true,
          bookingInfo: 'Room for 2 people May 18, 2025 to May 23, 2025',
        }))
      )
    );
  }
}
interface ExtendedWorkspace extends Workspace {
  mainPhoto: string;
  mainPhotoOverlay: string;
  photos: string[];
  amenities: string[];
  isBooked: boolean;
  bookingInfo: string;
}
