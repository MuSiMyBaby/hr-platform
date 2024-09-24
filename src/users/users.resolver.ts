import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'; // GraphQL 的基本功能，如查詢和變更
import { UsersService } from './users.service'; // 引入 UsersService，處理與資料庫的互動
import { User } from './entities/users.entity'; // 引入 User 實體
import { CreateUserInput } from './dto/create-user.input'; // 引入建立使用者時的輸入資料格式
import { UpdateUserInput } from './dto/update-user.input'; // 引入更新使用者時的輸入資料格式

@Resolver(() => User) // 這裡使用箭頭函數作為防止循環依賴的一種保險措施
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {} // 透過依賴注入注入 UsersService，讓 Resolver 使用這個服務層來處理邏輯

  @Query(() => [User]) // GraphQL 查詢用 返回User.entity格式，返回 User 實體的陣列
  findAll() {
    return this.usersService.findAllUsers(); // 調用 UsersService 來獲取所有使用者
  }
  @Query(() => [User])
  findAllUserWithDeleted() {
    return this.usersService.findAllUsersWithDeleted();
  }

  @Query(() => User) // GraphQL 查詢，根據 ID 查詢單一使用者
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOneUser(id); // 調用 UsersService 來獲取指定 ID 的使用者
  }

  @Mutation(() => User) // GraphQL 變更，創建新使用者
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput); // 調用 UsersService 的 create 方法來創建新使用者
  }

  @Mutation(() => User) // GraphQL 返回User.entity，更新使用者資料
  updateUser(
    @Args('id', { type: () => String }) id: string, // 接受使用者 ID 參數
    @Args('updateUserInput') updateUserInput: UpdateUserInput, // 接受更新使用者資料的參數
  ) {
    return this.usersService.updateUser(id, updateUserInput); // 調用 UsersService 來更新指定 ID 的使用者
  }

  @Mutation(() => Boolean) // GraphQL 變更，刪除使用者
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.removeUser(id); // 調用 UsersService 來刪除指定 ID 的使用者
  }
}
