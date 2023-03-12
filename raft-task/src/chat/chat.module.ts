import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "src/users/users.model"

@Module({
    imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
    providers: [UsersService],
    controllers: []
  })
  export class ChatModule {}