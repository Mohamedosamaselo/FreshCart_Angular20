import { Component, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
})
export class ErrorMessage {
  @Input() Control !: AbstractControl | null;



}
