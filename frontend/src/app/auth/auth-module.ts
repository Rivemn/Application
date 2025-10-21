import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from './auth';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [Auth],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class AuthModule {}
