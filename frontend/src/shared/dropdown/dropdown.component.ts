import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() items: any[] = [];
  @Input() selectedItem: any;
  @Input() displayProperty?: string;
  @Output() itemSelected = new EventEmitter<any>();

  isOpen = signal(false);

  constructor(private elementRef: ElementRef) {}

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen.update((v) => !v);
  }

  selectItem(item: any, event: MouseEvent) {
    event.stopPropagation();
    this.itemSelected.emit(item);
    this.isOpen.set(false);
  }

  getDisplayValue(item: any): string {
    return this.displayProperty ? item[this.displayProperty] : item;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen.set(false);
    }
  }
}
