import { FormGroup } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(formGroup: FormGroup) {
        const password = formGroup.controls.password.value;
        const confirmPassword = formGroup.controls.confirm_password.value;
        if (password !== confirmPassword) {
            formGroup.get('confirm_password').setErrors( {MatchPassword: true} )
        } else {
            return null;
        }
        return null;
    }
}
