import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  /** Цвет кнопки */
  @Input() color: 'primary' | 'success' | 'secondary' = 'primary';

  /** Текст, который будет отображён внутри кнопки */
  @Input() label: string = '';

  /** Если указан routerLink — рендерим ссылку вместо кнопки */
  @Input() routerLink: string | any[] | null | undefined;

  /** Тип кнопки (если это не ссылка) */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() disabled = false;
}
