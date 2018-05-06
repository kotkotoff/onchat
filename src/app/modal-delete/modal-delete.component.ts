import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  animations: [
    trigger('fade', [
      transition('* <=> *', [
        style([{ opacity: 0 }]),
        animate('0.3s ease-out', style([{ opacity: 1 }]))
      ])
    ])
  ],
  selector: 'modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
