import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { Button } from '../button/button';
import { FormInput } from '../form-input/form-input';
import { EventForm } from './event-form';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { EventDto } from '../../models/EventDto';

// Тестові дані для режиму редагування
const initialEventData: EventDto = {
  id: 'test-id-123',
  title: 'Existing Event Title',
  description: 'This is the description from initial data.',
  start: new Date(2025, 10, 15, 14, 30),
  end: null,
  location: 'Online',
  capacity: 50,
  participantsCount: 10,
  organizerId: 'org-id-456',
  organizerName: 'Organizer Name',
  isPublic: false,
  participantIds: [],
  tags: [],
};

const meta: Meta<EventForm> = {
  title: 'Shared/EventForm',
  component: EventForm,

  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,
      ],
      declarations: [EventForm, Button, FormInput],
      providers: [provideAnimations()],
    }),
  ],

  argTypes: {
    initialData: { control: 'object' },
    isLoading: { control: 'boolean' },
    submitButtonText: { control: 'text' },
    formSubmit: { action: 'formSubmit' }, // <-- Цього достатньо
    formCancel: { action: 'formCancel' }, // <-- Цього достатньо
  },
  // --- ВИПРАВЛЕНО: Видалено виклики action() з args ---
  args: {
    isLoading: false,
    initialData: null,
    // formSubmit: action('formSubmit'), // <-- Видалено
    // formCancel: action('formCancel'), // <-- Видалено
  },
  // ------------------------------------------------
};

export default meta;
type Story = StoryObj<EventForm>;

export const CreateMode: Story = {
  args: {
    submitButtonText: 'Create Event',
  },
};

export const EditMode: Story = {
  args: {
    initialData: initialEventData, // Тепер ці дані валідні
    submitButtonText: 'Save Changes',
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
    submitButtonText: 'Processing...',
  },
};

export const WithInitialData: Story = {
  args: {
    submitButtonText: 'Update Event',
    isLoading: false,
    initialData: {
      // Додаємо 'tags'
      id: '1',
      title: 'Tech Conference 2025',
      description: 'Annual technology conference...',
      start: new Date('2025-03-20T14:00:00.000Z'),
      end: null,
      location: 'Convention Center, San Francisco',
      isPublic: true,
      organizerId: 'user1',
      capacity: null,
      participantsCount: 0,
      organizerName: '',
      participantIds: [],
      tags: [], // <-- ВИПРАВЛЕНО
    },
  },
};

export const PrivateEvent: Story = {
  args: {
    submitButtonText: 'Create Private Event',
    isLoading: false,
    initialData: {
      // Додаємо 'tags'
      id: '2',
      title: 'Private Team Meeting',
      description: 'Quarterly planning meeting...',
      start: new Date('2025-03-20T14:00:00.000Z'),
      end: null,
      location: 'Conference Room A',
      capacity: 20,
      isPublic: false,
      organizerId: 'user2',
      participantsCount: 0,
      organizerName: '',
      participantIds: [],
      tags: [], // <-- ВИПРАВЛЕНО
    },
  },
};
