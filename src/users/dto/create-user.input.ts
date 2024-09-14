import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsIP,
  IsNumber,
  //MinLength,
} from 'class-validator';
import { IsTaiwanID } from '@validators/taiwan-id-validator'; // 加入自定義台灣身分證驗證
import { IsPassportNumber } from '@validators/passport-validator'; // 加入自定義護照號碼驗證
import { IsTaiwanPhoneNumber } from '@validators/taiwan-phone-validator'; // phone validation

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsTaiwanPhoneNumber({ message: 'Invalid Taiwan Phone number' })
  phoneNumber: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsTaiwanID({ message: 'Invalid Taiwan ID number' }) // 使用台灣身分證驗證器
  identityNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  workPermit?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPassportNumber({ message: 'Invalid passport number' }) // 使用護照號碼驗證器
  passport?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @Field()
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
  lastLoginIp?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  roleId?: number; // 關聯到角色（Role）的 ID
}
