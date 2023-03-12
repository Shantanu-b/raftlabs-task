import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
imports: [MongooseModule.forRoot('mongodb+srv://test:test@raft-task.5mpyugt.mongodb.net/test?retryWrites=true&w=majority'), UsersModule, AuthModule, CacheModule.register({isGlobal: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
