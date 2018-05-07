import { Component, OnInit} from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from "rxjs/Subject";

@Component({
  selector: "modal-delete",
  templateUrl: "./modal-delete.component.html",
  styleUrls: ["./modal-delete.component.css"]
})
export class ModalDeleteComponent implements OnInit {
  onClose: Subject<boolean>;
  constructor(private _bsModalRef: BsModalRef) {}

  public ngOnInit(): void {
    this.onClose = new Subject<boolean>();
  }

  confirm() {
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

  hide() {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }
}
