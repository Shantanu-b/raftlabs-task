import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';


@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string): Promise<User> {
        const existingUser = await this.getUser(username);
        console.log("check existing", existingUser);
        if(existingUser){
            throw new BadRequestException ("User already exists");
        }
        return await this.userModel.create({
            username,
            password,
        });
    }
    async getUser(username: string ): Promise<User> {
        const result = await this.userModel.findOne({username});
        return result
    }

    async deleteUser(username: string){
        console.log("in service layer", username);
        const result = await this.userModel.deleteOne({username}).exec();
        return result
    }

    async updateUsername(username: string, newUsername: string): Promise<Object>{
        const existingUser = await this.getUser(username);
        console.log("check existing");
        if(!existingUser){
            throw new BadRequestException ("User does not exists");
        }
        await this.userModel.findOneAndUpdate({username}, {username : newUsername});
        return true; 
    }
}