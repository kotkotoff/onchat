import { Component } from '@angular/core';
import { trigger, style, animate, query, stagger, transition } from '@angular/animations';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Message } from '../model/message';

@Component({
  animations: [
    trigger('fade', [
      transition('* <=> *', [
        style([{ opacity: 0 }]),
        animate('0.3s ease-out', style([ {opacity: 1}]))
      ])
    ])
  ],
  selector: 'modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

  constructor(public activeModal: NgbActiveModal) { }
}
