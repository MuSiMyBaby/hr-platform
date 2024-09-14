import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 匯入 TypeOrmModule
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { User } from './entities/users.entity'; // 匯入 User 實體

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 新增這一行，匯入 TypeOrmModule 並設定 User 實體
  providers: [UsersService, UsersResolver],
  //controllers: [UsersController],
})
export class UsersModule {}
