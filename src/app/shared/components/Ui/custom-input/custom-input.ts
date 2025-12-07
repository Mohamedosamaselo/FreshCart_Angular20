import { Component, forwardRef, Input, input } from '@angular/core';
import { NgPlural } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInput),
    multi: true
  }]
})

export class CustomInput implements ControlValueAccessor {
  @Input() type: string = 'text';           // ✅ Bound to HTML [type]
  @Input() placeholder: string = '';       // ✅ Bound to HTML [placeholder]


  value: any = '';
  disabled = false;

  onChange = (value: any) => { };
  onTouched = () => { };

  onInput(event: any) {
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
