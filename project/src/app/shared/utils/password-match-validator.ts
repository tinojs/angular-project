import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControlName: string,
  rePasswordControlName: string
): ValidatorFn {
  return (control) => {
    const passwordFromControl = control.get(passwordControlName);
    const repasswordFormControl = control.get(rePasswordControlName);

    const areMatching = passwordFromControl?.value === repasswordFormControl?.value;

    return areMatching ? null : { matchPasswordsValidator: true };
  };
}
