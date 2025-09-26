import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth-pop-up',
  imports: [],
  templateUrl: './auth-pop-up.html',
  styleUrl: './auth-pop-up.css'
})
export class AuthPopUp {
  @Output() event = new EventEmitter();
  @Input() title: string='';
  @Input() text: string='';
  @Input() buttonText: string='Log In';

  email: string = '';

  constructor() { }
  onSubmit() {
    this.event.emit({});    
  }
}
