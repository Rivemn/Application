import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Button } from '../button/button';
import { FormInput } from '../form-input/form-input';
import { EventForm } from './event-form';

const meta: Meta<EventForm> = {
  title: 'Forms/EventForm',
  component: EventForm,
  decorators: [
    moduleMetadata({
      declarations: [FormInput, Button],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<EventForm>;

// Базовая история с пустой формой
export const Default: Story = {
  args: {
    submitButtonText: 'Create Event',
    isLoading: false,
  },
};

// История с загрузкой
export const Loading: Story = {
  args: {
    submitButtonText: 'Creating Event...',
    isLoading: true,
  },
};

// История с предзаполненными данными для редактирования
export const WithInitialData: Story = {
  args: {
    submitButtonText: 'Update Event',
    isLoading: false,
    initialData: {
      id: '1',
      title: 'Tech Conference 2025',
      description:
        'Annual technology conference featuring the latest innovations in software development.',
      start: new Date('2025-03-20T14:00:00.000Z'),
      end: new Date('2025-03-20T16:00:00.000Z'),
      location: 'Convention Center, San Francisco',
      isPublic: true,
      organizerId: 'user1',
      capacity: null,
      participantsCount: 0,
      organizerName: '',
      participantIds: [],
    },
  },
};

// История с ошибками валидации
export const WithValidationErrors: Story = {
  args: {
    submitButtonText: 'Create Event',
    isLoading: false,
  },
  play: async ({ canvasElement, fixture }) => {
    // Эта функция выполнится после рендера компонента
    // Можно добавить логику для демонстрации ошибок валидации
    const form = canvasElement.querySelector('form');
    const submitButton = canvasElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (submitButton) {
      submitButton.click(); // Вызовет валидацию формы
    }
  },
};

// История с приватным событием
// История с приватным событием
export const PrivateEvent: Story = {
  args: {
    submitButtonText: 'Create Private Event',

    isLoading: false,
    initialData: {
      id: '2',
      title: 'Private Team Meeting',
      description: 'Quarterly planning meeting for the development team.',
      start: new Date('2025-03-20T14:00:00.000Z'),
      end: new Date('2025-03-20T16:00:00.000Z'),
      location: 'Conference Room A',
      capacity: 20,
      isPublic: false,
      organizerId: 'user2',
      participantsCount: 0,
      organizerName: '',
      participantIds: [],
    },
  },
};
