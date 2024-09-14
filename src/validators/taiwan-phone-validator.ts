import {
  registerDecorator,
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsTaiwanPhoneConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    return /^09\d{8}$/.test(phoneNumber);
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Invalid phone number format';
  }
}

export function IsTaiwanPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTaiwanPhoneConstraint,
    });
  };
}
