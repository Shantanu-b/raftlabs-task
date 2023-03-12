import { Controller, Request, Post, UseGuards, Get, Query, Res, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req, @Res() res) {
        try{
            const result = await this.authService.login(req.user);
            return res.status(HttpStatus.OK).send(result);
        }
        catch(error) {
            return res.status(HttpStatus.OK).send(error.response);
        }
    }

 
    @Get('sendotp')
    async sendOtp(@Query() query){
        try{

            console.log("in send otp",query);
            const result = await this.authService.sendOtp(query.username);
            console.log("result",result);
            return result
        }
        catch(error) {
            return error.response;
        }
    }
    
}