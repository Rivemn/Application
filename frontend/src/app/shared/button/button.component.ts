import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./button.component.scss'],
  template: `
    <button
      class="button"
      [ngClass]="{
        'button--full-width': fullWidth,
        'button--fixed-width': fixedWidth,
        'button--icon': icon,
        'button--delete': variant === 'delete'
      }"
      [disabled]="disabled"
      (click)="handleClick()"
    >
      <img *ngIf="icon" [src]="icon" [alt]="iconAlt" class="button-icon" />
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() fullWidth = false;
  @Input() fixedWidth = false;
  @Input() icon: string | null = null;
  @Input() iconAlt = '';
  @Input() variant: 'primary' | 'delete' | null = 'primary';
  @Input() link: string[] | null = null;
  @Input() disabled: boolean | null = false;
  @Output() onClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  handleClick(): void {
    this.onClick.emit();

    if (this.link && !this.disabled) {
      this.router.navigate(this.link);
    }
  }
}
