import { AngularRenderer, Meta, StoryContext, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Потрібні для обгортки

import { CommonModule, JsonPipe } from '@angular/common';

import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormInput } from './form-input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared-module';

@Component({
  selector: 'app-form-input-wrapper',
  standalone: false,
  imports: [CommonModule, ReactiveFormsModule, SharedModule, JsonPipe],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <app-form-input
        [label]="label"
        [type]="type"
        [placeholder]="placeholder"
        [helpText]="helpText"
        [required]="required"
        formControlName="testInput"
      ></app-form-input>

      <!-- Відображення стану контролу для наочності -->
      <div
        style="margin-top: 10px; font-family: monospace; font-size: 12px; background-color: #f0f0f0; padding: 5px; border-radius: 4px; border: 1px dashed #ccc;"
      >
        <p><strong>Value:</strong> {{ form.get('testInput')?.value | json }}</p>
        <p><strong>Status:</strong> {{ form.get('testInput')?.status | json }}</p>
        <p><strong>Touched:</strong> {{ form.get('testInput')?.touched | json }}</p>
        <p><strong>Errors:</strong> {{ form.get('testInput')?.errors | json }}</p>
      </div>
      <button
        type="submit"
        style="margin-top: 10px; padding: 5px 10px; border: 1px solid #ccc; background: #eee; border-radius: 4px; cursor:pointer;"
      >
        Submit (to show errors)
      </button>
    </form>
  `,
})
class FormInputWrapperComponent implements OnInit {
  // Передаємо @Input'и в обгортку, щоб керувати ними зі Storybook
  @Input() label: string = 'Label';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() helpText: string = '';
  @Input() required: boolean = false;
  @Input() initialValue: string | null = null;
  @Input() validators: any[] = []; // Для додаткових валідаторів

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      testInput: [this.initialValue, this.validators],
    });
    if (this.required) {
      this.form.get('testInput')?.addValidators(Validators.required);
      this.form.get('testInput')?.updateValueAndValidity();
    }
  }

  // Імітує відправку форми, щоб контрол отримав статус 'touched'
  onSubmit() {
    this.form.get('testInput')?.markAsTouched();
    console.log('Form Submitted (for validation display)');
  }
}

// --- Метадані Storybook ---
const meta: Meta<FormInputWrapperComponent> = {
  title: 'Shared/FormInput', // Шлях у навігації Storybook
  component: FormInputWrapperComponent, // Компонент, який тестуємо (обгортка)
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, // Для пайпа json та директив
        ReactiveFormsModule, // Для роботи з формами [formGroup], formControlName
      ],
      declarations: [
        FormInputWrapperComponent, // Оголошуємо обгортку
        FormInput, // Оголошуємо ваш компонент
      ],
      providers: [
        provideAnimations(), // Потрібно для деяких стилів Angular Material/CDK, якщо вони використовуються опосередковано
      ],
    }),
  ],
  // Опис аргументів (Inputs обгортки) для панелі Controls у Storybook
  argTypes: {
    label: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'textarea', 'number'] },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
    required: { control: 'boolean' },
    initialValue: { control: 'text' },
  },
  // Стандартні значення для аргументів
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    helpText: '',
    required: false,
    initialValue: '',
  },
};

export default meta;
// Визначаємо тип історії на основі обгортки
type Story = StoryObj<FormInputWrapperComponent>;

// --- Окремі історії для різних станів ---

// Звичайна історія з args за замовчуванням
export const Default: Story = {};

// Історія для обов'язкового поля
export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
  },
};

// Історія для поля пароля
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

// Історія для текстового поля
export const Textarea: Story = {
  args: {
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter details here...',
    initialValue: 'Initial text\nwith multiple lines.',
  },
};

// Історія з допоміжним текстом
export const WithHelpText: Story = {
  args: {
    label: 'Field with Help',
    helpText: 'This is some helpful text below the input.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    initialValue: 'Cannot edit this',
  },
  play: async (context: any) => {
    const component = context.component;
    if (component && component.form) {
      component.form.get('testInput')?.disable();
    } else {
      console.error('Component or form not found in play function context.');
    }
  },
};

// Історія, що демонструє помилку валідації email
export const WithEmailError: Story = {
  args: {
    label: 'Email (Invalid)',
    type: 'email',
    required: true,
    initialValue: 'invalid-email', // Невалідний email
    validators: [Validators.email], // Додаємо валідатор email
  },
};

// Історія, що демонструє помилку "required"
export const WithRequiredError: Story = {
  args: {
    label: 'Required Field (Empty)',
    required: true,
    initialValue: '', // Початково порожнє
  },
};
