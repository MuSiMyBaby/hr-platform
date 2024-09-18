import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsIP,
  IsNumber,
  Length,
} from 'class-validator';
import { IsTaiwanID } from '@validators/taiwan-id-validator'; // 加入自定義台灣身分證驗證
import { IsPassportNumber } from '@validators/passport-validator'; // 加入自定義護照號碼驗證
import { IsTaiwanPhoneNumber } from '@validators/taiwan-phone-validator'; // phone validation

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @Length(5, 100, { message: 'Email 長度應該在 5 到 100 字元之間' })
  email: string;

  @Field()
  @IsString()
  @IsTaiwanPhoneNumber({ message: 'Invalid Taiwan Phone number' })
  @Length(10, 15, { message: '電話號碼應該在 10 到 15 字元之間' })
  phoneNumber: string;

  @Field()
  @IsString()
  @Length(1, 50, { message: '名字不能超過 50 個字元' })
  firstName: string;

  @Field()
  @IsString()
  @Length(1, 50, { message: '姓氏不能超過 50 個字元' })
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsTaiwanID({ message: 'Invalid Taiwan ID number' }) // 使用台灣身分證驗證器
  @Length(10, 10, { message: '台灣身分證號碼應為 10 字元' })
  identityNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 20, { message: '工作許可證長度應該在 5 到 20 字元之間' })
  workPermit?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPassportNumber({ message: 'Invalid passport number' }) // 使用護照號碼驗證器
  @Length(5, 20, { message: '護照號碼長度應該在 5 到 20 字元之間' })
  passport?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(5, 255, { message: '圖片 URL 長度應該在 5 到 255 字元之間' })
  profilePicture?: string;

  @Field()
  @Length(8, 100, { message: '密碼長度應該在 8 到 100 字元之間' })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  googleLogin?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  facebookLogin?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  instagramLogin?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  lastLogin?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsIP()
  @Length(7, 45, { message: 'IP 地址應該在 7 到 45 字元之間' }) // IPv4 和 IPv6 長度
  lastLoginIp?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  roleId?: number; // 關聯到角色（Role）的 ID
}
