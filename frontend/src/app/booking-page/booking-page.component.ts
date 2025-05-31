import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
    FormsModule,
} from '@angular/forms';
import { CommonModule, AsyncPipe } from '@angular/common';
import { WorkspaceService } from '../services/workspace.service';
import { Observable } from 'rxjs';
import { Workspace } from '../contracts/Workspace';
import { AviabilityService } from '../services/availability.service';
import { Aviability } from '../contracts/Aviability';

@Component({
    selector: 'app-booking-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, AsyncPipe],
    templateUrl: './booking-page.component.html',
    styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent {
    form: FormGroup;
    openDropdown: string | null = null;

    workspaceOptions$: Observable<Workspace[]>;

    timeOptions = [
        '8:00 AM',
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
        '4:00 PM',
        '5:00 PM',
        '6:00 PM',
        '7:00 PM',
    ];

    days = Array.from({ length: 31 }, (_, i) => i + 1);
    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

    constructor(
        private fb: FormBuilder,
        private workspaceService: WorkspaceService,
        private aviabilityService: AviabilityService
    ) {
        const today = new Date(2025, 4, 30); // May 30, 2025

        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            room: [null, Validators.required],
            roomSize: [null, Validators.required],
            dateStart: [
                {
                    day: today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear(),
                },
                Validators.required,
            ],
            dateEnd: [
                {
                    day: today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear(),
                },
                Validators.required,
            ],
            timeStart: [null, Validators.required],
            timeEnd: [null, Validators.required],
        });

        this.workspaceOptions$ = this.workspaceService.getAll();
    }

    toggleDropdown(name: string) {
        this.openDropdown = this.openDropdown === name ? null : name;
    }

    closeDropdown(name: string) {
        if (this.openDropdown === name) {
            this.openDropdown = null;
        }
    }

    aviabilities: Aviability[] = [];

    selectRoom(room: Workspace) {
        this.form.get('room')?.setValue(room);
        this.openDropdown = null;

        // Загружаем aviabilities по room.id
        this.aviabilityService.getByWorkspaceId(room.id).subscribe({
            next: (data) => {
                this.aviabilities = data;
                console.log('Aviabilities loaded:', data);
            },
            error: (err) => {
                console.error('Failed to load aviabilities', err);
            },
        });
    }

    selectDatePart(controlName: string, part: string, event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        const current = this.form.get(controlName)?.value || {};
        const updated = { ...current, [part]: parseInt(value, 10) };

        const { day, month, year } = updated;
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day
        ) {
            this.form.get(controlName)?.setValue(updated);
        } else {
            this.form.get(controlName)?.setValue({ ...updated, day: null });
        }
    }

    selectTime(controlName: string, time: string) {
        this.form.get(controlName)?.setValue(time);
        this.openDropdown = null;
    }

    submit() {
        if (this.form.valid) {
            console.log('Booking submitted:', this.form.value);
            // Здесь может быть логика отправки запроса
        } else {
            console.warn('Form invalid:', this.form.errors);
        }
    }
}
