import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Coworking } from '../../contracts/Coworking';
import { Photo } from '../../contracts/Photo';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { loadCoworkings } from '../../store/coworking/coworking.actions';
import {
  selectCoworkingError,
  selectCoworkingLoading,
  selectCoworkings,
} from '../../store/coworking/coworking.selectors';
import { loadPhotosByCoworking } from '../../store/photo/photo.actions';
import { selectAllPhotos } from '../../store/photo/photo.selectors';

@Component({
  selector: 'app-coworking-list',
  standalone: false,
  templateUrl: './coworking-list.component.html',
  styleUrl: './coworking-list.component.scss',
})
export class CoworkingListComponent {
  coworkings$!: Observable<(Coworking & { photos: Photo[] })[]>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectCoworkingLoading);
    this.error$ = this.store.select(selectCoworkingError);

    const coworkings$ = this.store.select(selectCoworkings);
    const allPhotos$ = this.store.select(selectAllPhotos);

    // Диспатчим загрузку coworking'ов
    this.store.dispatch(loadCoworkings());

    // При каждом coworking'е диспатчим загрузку его фото
    coworkings$
      .pipe(
        tap((coworkings) => {
          coworkings.forEach((cw) =>
            this.store.dispatch(loadPhotosByCoworking({ coworkingId: cw.id }))
          );
        })
      )
      .subscribe();

    // Объединяем coworkings + photos
    this.coworkings$ = combineLatest([coworkings$, allPhotos$]).pipe(
      map(([coworkings, photos]) =>
        coworkings.map((cw) => ({
          ...cw,
          photos: photos.filter((photo) => photo.coworkingId === cw.id),
        }))
      )
    );
  }
}
