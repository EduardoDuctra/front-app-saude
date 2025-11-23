import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() show = false;

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.show = false;
    this.close.emit();
  }
}
