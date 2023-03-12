import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    private cacheManager;
    constructor(usersService: UsersService, jwtService: JwtService, cacheManager: any);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    sendOtp(username: string): Promise<any>;
}
