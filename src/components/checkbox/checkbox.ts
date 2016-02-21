import {Component} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";
import {Renderer} from "angular2/core";
import {ElementRef} from "angular2/core";
import {ControlValueAccessor} from "angular2/common";
import {NgControl} from "angular2/common";
import {Optional} from "angular2/core";

@Component({
  selector: 'md-checkbox',
  templateUrl: 'dist/src/components/checkbox/checkbox.html',
  styleUrls: [
    'dist/src/components/checkbox/checkbox.css',
    'dist/src/components/checkbox/checkbox-theme.css'
  ],
  host: {
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None
})
export class MdCheckbox implements ControlValueAccessor {

  // Accessor Values
  onChange = (_:any) => {};
  onTouched = () => {};

  checked_: boolean;

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer,
              @Optional() ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  onClick(): void {

    this.checked = !this.checked;

  }

  get checked() {
    return this.checked_;
  }

  set checked(value) {
    this.checked_ = !!value;
    this.onChange(this.checked_);

    this._elementRef.nativeElement.classList.toggle('md-checked', this.checked_);
  }

  writeValue(value: any): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}