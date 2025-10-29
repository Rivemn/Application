import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Валідатор для FormGroup, який перевіряє, чи обрана дата та час (з полів 'date' та 'time')
 * знаходяться у майбутньому порівняно з поточним моментом.
 */
export function dateTimeInFutureValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Отримуємо контроли дати та часу з FormGroup
    const dateControl = control.get('date');
    const timeControl = control.get('time');

    // Перевіряємо, чи існують контроли та чи мають вони значення
    if (!dateControl?.value || !timeControl?.value) {
      // Якщо дата або час не вибрані, валідатор не спрацьовує (це робота Validators.required)
      return null;
    }

    // Комбінуємо дату та час
    const selectedDate = new Date(dateControl.value);
    const [hours, minutes] = (timeControl.value as string).split(':');
    selectedDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0); // Обнуляємо секунди та мілісекунди

    // Отримуємо поточний час (з обнуленими секундами для порівняння)
    const now = new Date();
    now.setSeconds(0, 0);

    // Порівнюємо: вибраний час має бути пізніше або дорівнювати поточному
    if (selectedDate < now) {
      // Якщо дата/час у минулому, повертаємо помилку
      // Ключ 'dateTimeInPast' можна використовувати в шаблоні для показу повідомлення
      return { dateTimeInPast: true };
    }

    // Якщо все гаразд, повертаємо null (немає помилок)
    return null;
  };
}
