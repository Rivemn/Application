import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Coworking } from '../../contracts/Coworking';
import { map, Observable } from 'rxjs';
import { loadCoworkings } from '../../store/coworking/coworking.actions';
import {
  selectCoworkingError,
  selectCoworkingLoading,
  selectCoworkings,
} from '../../store/coworking/coworking.selectors';

@Component({
  selector: 'app-coworking-list',
  standalone: false,
  templateUrl: './coworking-list.component.html',
  styleUrl: './coworking-list.component.scss',
})
export class CoworkingListComponent {
  coworkings$!: Observable<Coworking[]>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectCoworkingLoading);
    this.error$ = this.store.select(selectCoworkingError);
    this.coworkings$ = this.store.select(selectCoworkings);

    this.store.dispatch(loadCoworkings());
  }
}
