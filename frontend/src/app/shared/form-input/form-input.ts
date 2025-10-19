import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: false,
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInput),
      multi: true,
    },
  ],
})
export class FormInput implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: string = 'text';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() helpText?: string;

  public value: string = '';
  public disabled = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * (ИЗМЕНЕНО)
   * Метод теперь принимает весь объект события (Event).
   */
  public onValueChange(event: Event): void {
    // Явно приводим тип target к HTMLInputElement
    const inputElement = event.target as HTMLInputElement;
    // Безопасно получаем значение
    this.value = inputElement.value;

    // Уведомляем Angular об изменениях
    this.onChange(this.value);
    this.onTouched();
  }
}
