import { AbstractControl, ValidatorFn } from '@angular/forms';

export function checkDates(fromControlName: string, untilControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fromControl = control.parent?.get(fromControlName);
    const fromValue = fromControl?.value;
    const untilControl = control.parent?.get(untilControlName);
    const untilValue = untilControl?.value;

    if (!fromValue || !untilValue) {
      return null;
    }

    const invalidDates = fromValue > untilValue;
    return invalidDates ? { invalidDates: true } : null;
  };
}