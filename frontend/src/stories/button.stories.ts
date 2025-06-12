import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../app/shared/button/button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Shared/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [[ButtonComponent]],
    }),
  ],
  args: {
    fullWidth: false,
    fixedWidth: false,
    icon: null,
    iconAlt: '',
    variant: 'primary',
    link: null,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  render: (args) => ({
    component: ButtonComponent,
    props: args,
    template: `<app-button>Default Button</app-button>`,
  }),
};

export const WithIcon: Story = {
  args: {
    icon: 'done.svg',
    iconAlt: 'Icon',
  },
  render: (args) => ({
    component: ButtonComponent,
    props: args,
    template: `<app-button [icon]="icon" [iconAlt]="iconAlt">Button with Icon</app-button>`,
  }),
};

export const DeleteVariant: Story = {
  args: {
    variant: 'delete',
  },
  render: (args) => ({
    component: ButtonComponent,
    props: args,
    template: `<app-button [variant]="variant">Delete Button</app-button>`,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    component: ButtonComponent,
    props: args,
    template: `<app-button [disabled]="disabled">Disabled Button</app-button>`,
  }),
};
