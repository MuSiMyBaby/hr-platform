import {
  isArray, // 檢查是否為陣列
  registerDecorator, // 註冊自訂的驗證器
  ValidationOptions, // 定義驗證選項，包含錯誤訊息等
  ValidatorConstraint, // 用於定義一個驗證器的限制條件
  ValidatorConstraintInterface, // 介面，規定驗證器類別應該包含 validate 和 defaultMessage 方法
} from 'class-validator';

@ValidatorConstraint({ async: false }) // 定義一個同步的驗證器
export class isTaiwanIDConstraint implements ValidatorConstraintInterface {
  validate(id: string) {
    // 驗證台灣身份證字號格式
    if (!/^[A-Z][1-2]\d{8}$/.test(id)) {
      return false; // 格式不符，返回 false
    }

    const alphabet = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'; // 台灣身份證字母對應的數字表
    const index = alphabet.indexOf(id[0]); // 找出身份證字母在 alphabet 中的索引值

    const idArray = [
      Math.floor(index / 10) + 1, // 計算身份證字母對應的數字的十位數
      index % 10, // 計算身份證字母對應的數字的個位數
      ...id
        .substring(1) // 從第二個字元開始擷取身份證的數字部分
        .split('') // 將字串拆分為單個字符
        .map((num) => parseInt(num, 10)), // 將每個字符轉換為整數
    ];

    const checksum = idArray.reduce(
      (sum, num, idx) => sum + num * (10 - idx), // 根據加權值計算總和
      0, // 初始值為 0
    );

    return checksum % 10 === 0; // 如果總和除以 10 的餘數為 0，則為有效的身份證字號
  }

  defaultMessage() {
    // 當驗證失敗時，返回的錯誤訊息
    return 'Invalid Taiwan ID number';
  }
}

export function IsTaiwanID(validationOptions?: ValidationOptions) {
  // 自訂驗證裝飾器的工廠函式
  return function (object: Object, propertyName: string) {
    // 註冊自訂驗證器
    registerDecorator({
      target: object.constructor, // 對應的目標類別
      propertyName: propertyName, // 被驗證的屬性名稱
      options: validationOptions, // 驗證選項，如錯誤訊息
      constraints: [], // 額外的限制（在這裡沒有使用）
      validator: isTaiwanIDConstraint, // 指定使用的驗證器
    });
  };
}
