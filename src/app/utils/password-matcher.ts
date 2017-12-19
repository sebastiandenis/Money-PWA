import { AbstractControl } from '@angular/forms';

export const passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
        return null;
    }
    if (password.value === confirmPassword.value) {
        return null;
    } else {
        return { nomatch: true };
    }
};