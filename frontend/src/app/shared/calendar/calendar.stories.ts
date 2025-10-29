import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Потрібно для іконок
import { Calendar, CalendarEvent } from './calendar';

// Створюємо тестові події
const sampleEvents: CalendarEvent[] = [
  { date: new Date(2025, 9, 20), title: 'Team Meeting' }, // October 20
  { date: new Date(2025, 9, 25), title: 'Project Deadline' }, // October 25
  { date: new Date(2025, 10, 5), title: 'Workshop' }, // November 5
];

const meta: Meta<Calendar> = {
  title: 'Shared/Calendar',
  component: Calendar,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule], // Додаємо MatIconModule
      declarations: [Calendar],
    }),
  ],
  argTypes: {
    events: { control: 'object' },
    // Обробляємо @Output 'dateSelected'
    dateSelected: { action: 'dateSelected' },
  },
  args: {
    events: sampleEvents,
  },
};

export default meta;
type Story = StoryObj<Calendar>;

export const Default: Story = {
  args: {}, // Використовує події з args вище
};

export const Empty: Story = {
  args: {
    events: [], // Порожній календар
  },
};

// Приклад того, як можна передавати дії
export const WithActionLogging: Story = {
  args: {
    events: sampleEvents,
  },
  // Налаштовуємо логування події
  parameters: {
    actions: {
      handles: ['dateSelected'], // Вказуємо @Output
    },
  },
};
