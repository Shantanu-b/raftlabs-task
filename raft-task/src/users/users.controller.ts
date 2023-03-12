import { Body, Controller, Post, Get, Param, Put, Res, HttpStatus, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { response } from 'express';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(
        @Body('password') password: string,
        @Body('username') username: string,
        @Res() response
    ): Promise<User> {
        try{
            console.log("In create user");
           
            const result = await this.usersService.createUser(
                username,
                password,
            );
            console.log("back ",result);
            return response.status(HttpStatus.OK).send(result);
        }
        catch (error){
            return response.status(HttpStatus.OK).send(error.response);

        }
    }

    @Get()
    async findUser(
        @Query() query,
        @Res() response
    ){
        try{
            console.log("In Get user",query)
            const result = await this.usersService.getUser(query.username);
            if (result){

                return response.status(HttpStatus.OK).send(result);
            }
            return response.status(HttpStatus.OK).send("User not found");
        }
        catch(error){
            return response.status(HttpStatus.OK).send(error.response);
        }
    }

    @Put()
    async updateUser(
        @Body('username') username : string,
        @Body('newUsername') newUsername : string,
        @Res() response
    ){
        try{
            console.log("in Update User");
            const result = await this.usersService.updateUsername(username,newUsername);
            console.log("after",result);
            return response.status(HttpStatus.OK).send(result);
        }
        catch(error){
            return response.status(HttpStatus.OK).send(error.response);
        }
    }

    @Delete(':username')
    async deleteUser(
        @Param('username') username: string,
    ){
        try{
            console.log("in delete user",username);
            const result = await this.usersService.deleteUser(username);
            console.log("result",result);
            return result;
        }
        catch(error){
            return response.status(HttpStatus.OK).send(error.response);
        }
    }
}