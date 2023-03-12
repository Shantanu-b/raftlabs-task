"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService, cacheManager) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.cacheManager = cacheManager;
    }
    async validateUser(username, password) {
        const user = await this.usersService.getUser(username);
        console.log("user", user);
        if (!user)
            return null;
        console.log("after ");
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
    async login(user) {
        const result = await this.validateUser(user.username, user.password);
        if (!result) {
            throw new common_1.BadRequestException('username and password do not match');
        }
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async sendOtp(username) {
        console.log("in service layer", username);
        const user = await this.usersService.getUser(username);
        if (!user)
            throw new common_1.BadRequestException('user doesnt exist');
        const cachedOtp = await this.cacheManager.get(username);
        console.log("cachedOtp", cachedOtp);
        if (!cachedOtp) {
            const otp = Math.floor(Math.random() * 8999) + 1000;
            console.log("otp", otp);
            await this.cacheManager.set(username, otp, 30000);
            return otp;
        }
        else {
            console.log("Cached Otp: ", cachedOtp);
            return cachedOtp;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map