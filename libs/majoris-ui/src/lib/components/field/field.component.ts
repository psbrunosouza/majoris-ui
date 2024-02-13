import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

type Type = 'password' | 'text' | 'email' | 'number';

type Height = 'sm' | 'md' | 'lg';

type Rounded = 'sm' | 'md' | 'lg' | 'full' | 'none';

@Component({
  selector: 'mjs-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent implements ControlValueAccessor, AfterViewInit {
  @Input({ transform: booleanAttribute }) required = false;

  @Input({ transform: booleanAttribute }) readonly = false;

  @Input({ transform: booleanAttribute }) disabled = false;

  @Input() label: string = '';

  @Input() icon: string = '';

  @Input() type: Type = 'text';

  @Input() rounded: Rounded = 'sm';

  @Input() size: Height = 'md';

  @Input() placeholder: string = '';

  @Output() blur: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('field') field: ElementRef<HTMLDivElement>;

  @ViewChild('icon') iconRef: ElementRef<HTMLElement>;

  get roundedClass(): string {
    return `field-border-rounded--${this.rounded}`;
  }

  get getHeight(): string {
    return `field-height--${this.size}`;
  }

  get classes(): string[] {
    return ['color-theme', this.getHeight, this.roundedClass];
  }

  text: string = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    this.ngControl && (this.ngControl.valueAccessor = this);
  }
  ngAfterViewInit(): void {
    this.classes.forEach((c) => {
      if (c) {
        this.field.nativeElement.classList.add(c);
      }
    });
  }

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  writeValue(text: string): void {
    this.text = text;
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public onChange() {
    this.onChangeFn(this.text);
  }

  public onBlur() {
    this.onTouchedFn();
    this.blur.emit();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
