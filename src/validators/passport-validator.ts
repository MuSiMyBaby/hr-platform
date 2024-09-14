import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPassportNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(passportNumber: string) {
    return /^[A-Z0-9]{6,9}$/.test(passportNumber);
  }

  defaultMessage() {
    return 'Invalid passport number';
  }
}

export function IsPassportNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPassportNumberConstraint,
    });
  };
}
