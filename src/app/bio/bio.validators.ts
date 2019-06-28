import { AbstractControl } from "@angular/forms";

export class CustomValidator {
  static validateHeight(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const height: string = control.value;
    const pattern = "^[4-6]'((1[0-1]|[0-9])\")?$";
    if (!height || height.match(pattern)) return null;
    else return { heightMismatch: true };
  }

  static validateEmail(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const email: string = control.value;
    const pattern =
      "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$";
    if (!email || email.match(pattern)) return null;
    else return { invalidEmail: true };
  }

  static validateContact(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const contact: string = control.value;
    const pattern = "^(\\+91)?[1-9]{1}[0-9]{9}$";
    if (!contact || contact.match(pattern)) return null;
    else return { invalidContact: true };
  }
}
