import { AfterContentInit, Component, EventEmitter, forwardRef, Injector, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from './input-base.component';

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="checkbox-group {{addMargin ? ('mb-' + addMargin): 'mb-0'}}"
         [class.dark-border__checkbox-group]="darkBorder">
      <label class="checkbox-group__label mb-0" [class.p-0]="!label">
        <span class="checkbox-group__label-text body-2 mb-0" [class.ws-nowrap]="nowrap">{{label}}</span>
        <input (click)="change()" type="checkbox" checked="checked" class="checkbox-group__control"
               [disabled]="!!isDisabled" [(ngModel)]="inputValue">
        <div class="checkbox-group__checkmark"
             [class.dark-border__checkbox-group__checkmark]="darkBorder"></div>
      </label>
    </div>
  `,
  styleUrls: ['./input-base.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppCheckboxComponent),
      multi: true,
    },
  ],
})

export class AppCheckboxComponent extends InputBaseComponent implements AfterContentInit {
  @Input() override owner: any;
  @Input() label: string = '';
  @Input() nowrap = true;
  @Input() darkBorder = false;
  @Input() withCheckbox = false;
  @Input() addMargin!: number;
  @Input() item!: any;
  @Input() rawValue!: string;

  @Output() check = new EventEmitter<{ checked: boolean, label: string }>();

  private _editing: boolean = false;

  constructor(private inj: Injector) {
    super(inj);
  }

  blurFunc() {
    this._editing = false;
  }

  focusFunc() {
    this._editing = true;
  }

  change() {
    if (!this.isDisabled) {

      this.check.emit({checked: !this.inputValue, label: this.label});
    }
  }

  public ngAfterContentInit() {
    super.ngOnInit();
  }

  public override errorForControl(control: { errors: any; dirty: any; touched: any; }) {
    return !!(!this._editing && control && control.errors && (control.dirty || control.touched));
  }
}
