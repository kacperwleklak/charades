import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Output() sendMessage: EventEmitter<string> = new EventEmitter();

  message: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSend() {
    this.sendMessage.emit(this.message);
    delete this.message;
  }

}
