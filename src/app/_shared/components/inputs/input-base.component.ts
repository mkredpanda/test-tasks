import { Component, ElementRef, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl } from '@angular/forms';

export interface SelectOptionsInterface {
  [key: string]: any;
}

export interface AbstractControlWarn extends AbstractControl {
  warnings: any;
}

export function emailDomainWarning(control: AbstractControlWarn) {
  const domainList = ['mail.ru', 'inbox.ru', 'list.ru', 'bk.ru', 'mail.ua', 'yandex.ru'];
  const email = control.value;

  if (!control.value) {
    return null;
  }

  if (email && email.indexOf('@') !== -1) {
    const [domain] = email.split('@');
    for (let a = 0; a < domainList.length; a++) {
      if (domain === domainList[a]) {
        control.warnings = email;
      }
    }
  }
  return null;
}
export function OnlyLetters(control: AbstractControl) {
  // /^[-а-щА-ЩЬьЮюЯяЇїІіЄєҐґ'`’ /.]{0,100}$/
  const latinRegExp = /^[a-zA-Z-а-яА-Я-а-щА-ЩЬьЮюЯяЇїІіЄєҐґ'`’ /.]{0,100}$/;
  if (!latinRegExp.test(control.value)) {
    return {'OnlyLetters': true};
  } else {
    return null;
  }
}

export function FullNameValidator(control: AbstractControl) {
  const regExp = /^[a-zA-Z-а-яА-Я-а-щА-ЩЬьЮюЯяЇїІіЄєҐґ'`’ \-.]{0,100}$/;
  if (!regExp.test(control.value)) {
    return {'OnlyLetters': true};
  } else {
    return null;
  }
}

export function WrongPhoneNumber(control: AbstractControl) {
  // const phoneRegExp = /[+][3][8][0-9][ ][(][0-9]{2}[)][ ][0-9]{3}[-][0-9]{2}[-][0-9]{2}/;
  const phoneRegExp = /^\d{10}$/g;
  if (!phoneRegExp.test(control.value)) {
    return {'wrongPhoneNumber': true};
  } else {
    return null;
  }
}

export function WrongEmail(control: AbstractControl) {
  const emailRegExp = /^[a-zA-Z0-9._-]+@[a-z0-9.-]+\.[a-z]{1,25}$/;
  if (control && control.value && !emailRegExp.test(control.value)) {
    return {'wrongEmail': true};
  } else {
    return null;
  }
}
export function urlPatternValidation(control: AbstractControl) {
  const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
  if (!control.value) {
    return null;
  }
  if (!regex.test(control.value)) {
    return {'wrongUrl': true};
  } else {
    return null;
  }
}
@Component({
  template: ``,
})
export abstract class InputBaseComponent implements ControlValueAccessor, OnInit {
  static validationMessages: {
    [key: string]: string;
  } = {
    'required': 'This field is required.',
    'minlength': 'Please enter at least %% characters.',
    'maxlength': 'Please enter at most %% characters.',
    'maxlength29': 'Please enter at most 29 characters.',
    'pattern': 'Please enter a valid value.',
    'MatchPassword': 'Passwords do not match.',
    'DoInvoiceFioEmail': 'Please enter less than 194 symbols in name and email inputs!',
    'wrongINN': 'Please enter the correct ITN code.',
    'wrongEDR': 'Please enter the correct EDR code.',
    'onlyDigits': 'Please enter only digits',
    'onlyUkr': 'Please enter in Ukrainian.',
    'onlyUkrAndDigits': 'Please use the Ukrainian characters and digits',
    'OnlyLetters': 'OnlyLetters',
    'wrongPhoneNumber': 'Please enter full phone number.',
    'wrongEmail': 'Please enter a valid value.',
    'accountNumberError': 'Please enter a valid account number',
    'ibanError': 'Wrong IBAN',
    'bankCodeError': 'Wrong MFO code',
    'Only for business': 'Only for business account',
    'forbiddenCharacter': 'You entered forbidden symbol',
    'wrongPostIndex': 'There is no such index',
    'inValidExt': 'inValidExt',
    'wrongPasswordOrKeyInvalid': 'wrongPasswordOrKeyInvalid',
    'errorOnInput': 'DO_INVOICE.MASS.errorOnInput',
    'wrongUrl': 'Please enter a valid value.',
    'amountValidatorMin': 'VALIDATION.k2',
    'amountValidatorMax': 'VALIDATION.k1',
  };

  @Input() ctrl?: AbstractControl;

  @Input() controlAttribute?: string;
  @Input() owner: any;
  @Input() id?: string;
  @Input() elClass?: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() isDisabled?: string | boolean;
  @Input() containerClass?: string;
  @Input() labelClass?: string;
  @Input() labelText?: string;
  @Input() hintCount?: string;
  @Input() maxLength?: number;
  @Input() type?: string;
  @Input() fieldMask?: any;
  @Input() prefixText?: string;
  @Input() prefixIcon?: string;
  @Input() suffix?: string;
  @Input() suffixIcon?: string;
  @Input() loginLabel?: boolean;
  @Input() defaultValue?: string | boolean = '';
  @Input() customPrefix?: string;
  @Input() isWhiteBg: boolean = false;
  @Input() isLabel: boolean = true;
  @Input() icon_color: string = 'white';
  @Input() minLength?: number;
  @Input() infoTip?: string;


  @Input() options: SelectOptionsInterface[] = [];
  @Input() multi: boolean = false;

  public focused = false;
  public touched = false;

  public editing: boolean = false;

  control: FormControl | undefined;
  el: ElementRef;

  controlValue: any = '';

  constructor(
    private _inj: Injector,
  ) {
    this.el = _inj.get(ElementRef);
  }

  get inputValue() {
    return this.controlAttribute ? this.controlValue[this.controlAttribute] : this.controlValue;
  }

  set inputValue(val) {
    if (this.controlAttribute) {
      this.controlValue[this.controlAttribute] = val;
    } else {
      this.controlValue = val;
    }

    this.propagateChange(this.controlValue);
  }

  propagateChange = (_: any) => {
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      if (value && value.target?.files?.length) {
        this.controlValue = value.target.files;
      } else {
        this.controlValue = value;
      }
      this.propagateChange(this.controlValue);
    }
  }

  registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  ngOnInit(): void {
    const controlName = this.el.nativeElement.attributes.getNamedItem('formControlName')?.value;

    this.control = this.owner.formGroup?.controls[controlName];
    this.id = this.id || controlName;
    this.name = (this.name || controlName)?.replace(/<(?:.|\n)*?>/gm, ''); // strip html
    this.elClass = this.elClass || 'form-control';
  }

  showError(ctrl: AbstractControl): string | null {
    if (ctrl && ctrl.errors) {
      const validatorId = Object.keys(ctrl.errors)[0];
      const validationMessage = InputBaseComponent.validationMessages[validatorId];
      // @ts-ignore
      let errorString = '';

      if (validationMessage) {
        errorString = InputBaseComponent.validationMessages[validatorId];

        if (ctrl.errors['minlength']) {
          errorString = errorString.replace('%%', ctrl.errors['minlength'].requiredLength);
        } else if (ctrl.errors['maxlength']) {
          errorString = errorString.replace('%%', ctrl.errors['maxlength'].requiredLength);
        } else {
          let replaceStr = '';
          switch (validatorId) {
            case('amountValidatorMin'):
            case('amountValidatorMax'):
              // @ts-ignore
              replaceStr = this.control.errors[validatorId].value;
              break;
          }
          errorString = errorString.replace('%s', replaceStr);
        }
      }
      return errorString;
    } else {
      return null;
    }
  }

  public errorForControl(control: { errors: any; dirty: any; touched: any; }) {
    return !!(!this.editing && control && control.errors && (control.dirty || control.touched));
  }
}
