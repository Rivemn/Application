import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() color: 'primary' | 'success' | 'secondary' | 'danger' = 'primary';

  @Input() label: string = '';

  @Input() routerLink: string | any[] | null | undefined;

  /** Тип кнопки (если это не ссылка) */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() disabled = false;
}
