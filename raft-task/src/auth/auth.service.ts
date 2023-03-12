import { Injectable, NotAcceptableException, CACHE_MANAGER, Inject, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, 
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager
        ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser( username );
        console.log("user", user);
        if (!user) return null;
        console.log("after ", );
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const result = await this.validateUser( user.username , user.password)
        if(!result){
            throw new BadRequestException('username and password do not match');
        }
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    
    }

    async sendOtp(username: string){
        console.log("in service layer", username);
        const user = await this.usersService.getUser( username );
        if (!user) throw new BadRequestException('user doesnt exist');
        const cachedOtp = await this.cacheManager.get(username);
        console.log("cachedOtp", cachedOtp);
        if (!cachedOtp) {
        const otp = Math.floor(Math.random() * 8999) + 1000;
        console.log("otp",otp);
        await this.cacheManager.set(username, otp, 30000);
        return otp;
        }
        else {
            console.log("Cached Otp: ", cachedOtp)
            return cachedOtp;
        }
  }
}

