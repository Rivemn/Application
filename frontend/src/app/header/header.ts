import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(public router: Router) {}

  // 3. (Опционально) Можно создать "геттер" для удобства,
  //    который будет проверять, находимся ли мы на странице 'create-event'.
  //    public router.url тоже будет работать в шаблоне.
  public get isCreateEventPage(): boolean {
    return this.router.url.includes('/create-event');
  }
}
