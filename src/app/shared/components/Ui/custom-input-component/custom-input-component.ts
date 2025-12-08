import { booleanAttribute, Component, forwardRef, input, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input-component',
  imports: [],
  templateUrl: './custom-input-component.html',
  styleUrl: './custom-input-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() type!: string;
  @Input() formControlName!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() placeholder!: string;
  @Input({ transform: booleanAttribute }) required: boolean = false;
  @Input() class!: string; // Accept Tailwind or custom classes

  value: any = '';
  disabled: boolean = false;

  // these functions to track input events
  onChange = (value: any): void => {};
  OnTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.OnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // input event handler
  UpdateValue(event: any) {
    const _value = event.target.value;
    this.value = _value;
    this.onChange(this.value);
  }
}
