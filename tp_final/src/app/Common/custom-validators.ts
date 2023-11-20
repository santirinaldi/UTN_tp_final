import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { JSONService } from '../services/JSON/json.service';
import { map } from 'rxjs';

export function userExistsValidator(
  jsonService: JSONService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return jsonService.findUserByEmail(control.value).pipe(
      map((users) => {
        return users && users.length > 0 ? { userExists: true } : null;
      })
    );
  };
}
