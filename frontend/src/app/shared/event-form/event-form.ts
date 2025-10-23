import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EventDto } from '../../models/EventDto';
import { EventFormData } from '../../models/EventFormData';
import { dateTimeInFutureValidator } from '../Validators/date-time.validator';
import { debounceTime, merge, Subscription, tap } from 'rxjs';
@Component({
  selector: 'app-event-form',
  standalone: false,
  templateUrl: './event-form.html',
  styleUrl: './event-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventForm {
  eventForm!: FormGroup;
  public readonly minDate: Date;

  @Input() initialData: EventDto | null = null;
  @Input() isLoading = false;
  @Input() submitButtonText = 'Submit';
  private statusChangesSubscription: Subscription | undefined;
  @Output() formSubmit = new EventEmitter<EventFormData>();
  @Output() formCancel = new EventEmitter<void>();

  private valueChangesSubscription: Subscription | undefined; // Для відписки

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.minDate = new Date();
    // Обнуляємо години/хвилини для minDate, щоб сьогоднішній день був доступний
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.initialData) {
      this.populateForm(this.initialData);
    }

    // Залишаємо підписку на statusChanges, вона все ще корисна для оновлення
    // при зміні валідності (наприклад, коли dateTimeInFutureValidator спрацьовує)
    const controls = Object.values(this.eventForm.controls);
    this.statusChangesSubscription = merge(
      this.eventForm.statusChanges,
      ...controls.map((control) => control.statusChanges)
    )
      .pipe(
        debounceTime(0),
        tap(() => {
          this.cdr.markForCheck();
          // console.log('Status changed, markForCheck called.'); // Можна залишити для відладки
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.statusChangesSubscription?.unsubscribe();
  }

  // Гетери для доступу до контролів у шаблоні
  get title(): AbstractControl | null {
    return this.eventForm.get('title');
  }
  get description(): AbstractControl | null {
    return this.eventForm.get('description');
  }
  get date(): AbstractControl | null {
    return this.eventForm.get('date');
  }
  get time(): AbstractControl | null {
    return this.eventForm.get('time');
  }
  get location(): AbstractControl | null {
    return this.eventForm.get('location');
  }
  get capacity(): AbstractControl | null {
    return this.eventForm.get('capacity');
  }

  // Ініціалізація форми з валідаторами
  private initForm(): void {
    this.eventForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.maxLength(200)]],
        description: ['', Validators.required],
        date: [null, Validators.required],
        time: ['', Validators.required],
        location: ['', [Validators.required, Validators.maxLength(300)]],
        // Валідатор min(1) для capacity
        capacity: ['', [Validators.min(1)]],
        visibility: ['public', Validators.required],
      },
      {
        // Застосовуємо кастомний валідатор до FormGroup
        validators: dateTimeInFutureValidator(),
      }
    );
  }

  // Заповнення форми початковими даними (при редагуванні)
  private populateForm(event: EventDto): void {
    const startDate = new Date(event.start);
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      date: startDate,
      time: startDate.toTimeString().slice(0, 5), // 'HH:mm'
      location: event.location,
      capacity: event.capacity,
      visibility: event.isPublic ? 'public' : 'private',
    });
    // Після заповнення форми повідомляємо Angular
    this.cdr.markForCheck();
  }

  // Обробка відправки форми
  onFormSubmit(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched(); // Позначаємо ВСІ поля як touched
      // Повідомляємо Angular, щоб помилки відобразились
      this.cdr.markForCheck();
      return;
    }

    // Готуємо дані для відправки родителю
    const formValue = this.eventForm.value;
    const startDate = new Date(formValue.date);
    const [hours, minutes] = formValue.time.split(':');
    startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    const formData: EventFormData = {
      title: formValue.title,
      description: formValue.description,
      start: startDate.toISOString(),
      end: null, // Логіку для End Date можна додати пізніше
      location: formValue.location,
      // Перетворюємо capacity на число або null
      capacity: formValue.capacity ? parseInt(formValue.capacity, 10) : null,
      isPublic: formValue.visibility === 'public',
    };

    // Відправляємо подію родителю
    this.formSubmit.emit(formData);
  }

  // Обробка натискання кнопки "Cancel"
  onCancelClick(): void {
    this.formCancel.emit();
  }
}
