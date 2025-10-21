import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './button/button';
import { FormInput } from './form-input/form-input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Calendar } from './calendar/calendar';

@NgModule({
  declarations: [Button, FormInput, Calendar],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [Button, FormInput, Calendar, CommonModule, FormsModule, RouterModule], // экспортируем, чтобы другие модули сразу имели
})
export class SharedModule {}
