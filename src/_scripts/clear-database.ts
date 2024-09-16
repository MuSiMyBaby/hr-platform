import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { UsersService } from '@users/users.service'; //clear()方法在這

async function bootstrap() {
  // 建立應用程式的執行環境，這與啟動完整的 HTTP 伺服器不同 NestFactory.create。
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UsersService);
  if (process.env.NODE_ENV !== 'production') {
    await userService.clearAllUsers();
  } else {
    console.log('clearAllUsers() is disabled in production.');
  }
  await app.close();
}

bootstrap().catch((err) => {
  console.error(`Can't TRUNCATE `, err);
  process.exit(1);
});
