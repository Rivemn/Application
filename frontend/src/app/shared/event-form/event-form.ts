import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { EventDto } from '../../models/EventDto';
import { EventFormData } from '../../models/EventFormData';
import { dateTimeInFutureValidator } from '../Validators/date-time.validator';
import { debounceTime, merge, Observable, Subscription, tap } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { TagDto } from '../../models/TagDto';
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

  // --- Властивості для тегів ---
  separatorKeysCodes: number[] = [ENTER]; // Клавіші для додавання тегу
  tagCtrl = new FormControl(''); // Окремий FormControl для поля вводу тегів
  selectedTags: string[] = []; // Список введених/вибраних імен тегів
  maxTags = 5; // Максимальна кількість тегів
  // ВИДАЛЕНО: filteredTags, allTags
  // --------------------------------

  @Input() initialData: EventDto | null = null;
  @Input() isLoading = false;
  @Input() submitButtonText = 'Submit';

  @Output() formSubmit = new EventEmitter<EventFormData>();
  @Output() formCancel = new EventEmitter<void>();

  // ВИДАЛЕНО: @ViewChild('tagInput') - більше не потрібен для очищення автодоповнення

  private statusChangesSubscription: Subscription | undefined;
  // ВИДАЛЕНО: private tagService = inject(TagService);

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);
    // ВИДАЛЕНО: Налаштування filteredTags
  }

  ngOnInit(): void {
    // ВИДАЛЕНО: loadAllTags();
    this.initForm();
    if (this.initialData) {
      this.populateForm(this.initialData);
    }

    const controlsToWatch = [
      'title',
      'description',
      'date',
      'time',
      'location',
      'capacity',
      'tags',
    ]; // Додаємо 'tags' FormArray
    const controlStatusChanges = controlsToWatch
      .map((name) => this.eventForm.get(name)?.statusChanges)
      .filter((obs): obs is Observable<any> => !!obs);

    this.statusChangesSubscription = merge(this.eventForm.statusChanges, ...controlStatusChanges)
      .pipe(
        debounceTime(0),
        tap(() => this.cdr.markForCheck())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.statusChangesSubscription?.unsubscribe();
  }

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

  get tagsArray(): FormArray | null {
    return this.eventForm.get('tags') as FormArray | null;
  }

  private initForm(): void {
    this.eventForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.maxLength(200)]],
        description: ['', [Validators.required]],
        date: ['', Validators.required],
        time: ['', Validators.required],
        location: ['', [Validators.required, Validators.maxLength(300)]],
        capacity: ['', [Validators.min(1)]],
        visibility: ['public', Validators.required],
        tags: this.fb.array([], [this.maxTagsValidator(this.maxTags)]),
      },
      {
        validators: dateTimeInFutureValidator(),
      }
    );
  }

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

    if (event.tags && event.tags.length > 0) {
      this.selectedTags = event.tags.map((tag: TagDto) => tag.name);

      this.updateTagsFormArray();
    }

    this.cdr.markForCheck();
  }

  onFormSubmit(): void {
    // Перевіряємо валідність основної форми та FormArray тегів
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      // Опціонально: встановити фокус на перше невалідние поле
      this.cdr.markForCheck();
      return;
    }
    // ... підготовка formData ...
    const formValue = this.eventForm.value;
    const startDate = new Date(formValue.date);
    const [hours, minutes] = formValue.time.split(':');
    startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    const formData: EventFormData = {
      title: formValue.title,
      description: formValue.description,
      start: startDate.toISOString(),
      end: null,
      location: formValue.location,
      capacity: formValue.capacity ? parseInt(formValue.capacity, 10) : null,
      isPublic: formValue.visibility === 'public',
      tagNames: this.selectedTags, // <-- Надсилаємо список імен
    };
    this.formSubmit.emit(formData);
  }

  onCancelClick(): void {
    this.formCancel.emit();
  }
  triggerUpdate(): void {
    this.cdr.markForCheck();
  }

  // --- Методи для роботи з тегами (Chips) ---

  // СПРОЩЕНО: Обробляє тільки введення вручну
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Перевіряємо, чи є значення, чи тег вже додано і чи не перевищено ліміт
    if (
      value &&
      !this.selectedTags.some((t) => t.toLowerCase() === value.toLowerCase()) &&
      this.selectedTags.length < this.maxTags
    ) {
      this.selectedTags.push(value); // Додаємо до списку
      this.updateTagsFormArray(); // Синхронізуємо FormArray
    }

    // Очищуємо поле вводу
    event.chipInput!.clear();
    // Скидаємо значення FormControl (для автодоповнення, якщо воно було)
    this.tagCtrl.setValue(null);
  }

  // Видалення тегу (залишається без змін)
  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.updateTagsFormArray();
    }
  }

  // Синхронізує FormArray з selectedTags (залишається без змін)
  private updateTagsFormArray(): void {
    const tagsFormArray = this.tagsArray; // Використовуємо гетер
    if (tagsFormArray) {
      tagsFormArray.clear();
      this.selectedTags.forEach((tag) => tagsFormArray.push(this.fb.control(tag)));
      tagsFormArray.updateValueAndValidity(); // Оновлюємо статус валідності
      this.cdr.markForCheck(); // Повідомляємо про зміни
    }
  }

  // Кастомний валідатор для максимальної кількості тегів (залишається без змін)
  private maxTagsValidator(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Перевіряємо, чи control дійсно є FormArray
      if (!(control instanceof FormArray)) {
        return null; // Або кинути помилку, якщо очікується тільки FormArray
      }
      return control.length > max
        ? { maxTagsExceeded: { max: max, actual: control.length } }
        : null;
    };
  }
  onTagKeyDown(event: KeyboardEvent, input: HTMLInputElement): void {
    const key = event.key;

    if (key === ',' || key === '‚' || key === '„') {
      event.preventDefault();

      const value = input.value.trim();
      if (
        value &&
        !this.selectedTags.some((t) => t.toLowerCase() === value.toLowerCase()) &&
        this.selectedTags.length < this.maxTags
      ) {
        this.selectedTags.push(value);
        this.updateTagsFormArray();
      }

      input.value = '';
      this.tagCtrl.setValue(null);
    }
  }
}
