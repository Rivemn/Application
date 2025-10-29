import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common'; // Потрібен для ngClass, ngIf
import { Button } from '../button/button';

// Метадані для Storybook
const meta: Meta<Button> = {
  title: 'Shared/Button', // Назва в ієрархії Storybook
  component: Button,
  // Декоратори потрібні для імпорту модулів Angular
  decorators: [
    moduleMetadata({
      imports: [CommonModule], // Імпортуємо CommonModule для директив
      declarations: [Button], // Оголошуємо компонент (якщо не standalone)
    }),
  ],
  // Описуємо аргументи (Inputs) компонента
  argTypes: {
    label: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: 'boolean' },
    routerLink: { control: 'text' }, // Для демонстрації посилання
    // Тут можна додати опис для @Output, якщо потрібно (actions)
  },
  // Стандартні значення аргументів
  args: {
    label: 'Button Text',
    color: 'primary',
    type: 'button',
    disabled: false,
    routerLink: null,
  },
};

export default meta;
type Story = StoryObj<Button>;

// --- Окремі історії для різних станів ---

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    color: 'success',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    color: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const Link: Story = {
  args: {
    label: 'Link Button',
    color: 'primary',
    routerLink: '/some-route',
  },
};
