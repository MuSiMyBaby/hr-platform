import {
  registerDecorator, // 用來將自定義驗證器註冊到 class-validator 中
  ValidatorConstraintInterface, // 用來定義驗證器應該遵循的介面
  ValidatorConstraint, // 將 class 註冊為驗證器的裝飾器
  ValidationOptions, // 定義驗證選項，可以自定義錯誤訊息或其他選項
  ValidationArguments, // 用來提供驗證過程中的參數（如欄位名稱、欄位值等）
} from 'class-validator';

@ValidatorConstraint({ async: false }) // 定義這個驗證器為同步驗證器，不會使用異步操作
export class IsTaiwanPhoneConstraint implements ValidatorConstraintInterface {
  // validate 函數負責進行實際的驗證邏輯
  validate(phoneNumber: string) {
    // 正則表達式檢查電話號碼是否符合台灣的手機格式
    // 台灣手機號碼格式為 "09" 開頭，後面接 8 個數字（共 10 個數字）
    return /^09\d{8}$/.test(phoneNumber);
  }

  // 當驗證失敗時，返回的預設錯誤訊息
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Invalid phone number format'; // 錯誤訊息：格式不正確的電話號碼
  }
}

// 自定義的驗證裝飾器
export function IsTaiwanPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    // 註冊自定義驗證器到指定的 class 和屬性
    registerDecorator({
      target: object.constructor, // 目標類別
      propertyName: propertyName, // 欄位名稱
      options: validationOptions, // 自定義選項，如自定義錯誤訊息
      constraints: [], // 約束條件（這裡不需要，所以設為空陣列）
      validator: IsTaiwanPhoneConstraint, // 指定使用的驗證器為 IsTaiwanPhoneConstraint
    });
  };
}
